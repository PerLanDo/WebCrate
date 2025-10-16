import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error(
    "Gemini API key is not set. Please set the VITE_GEMINI_API_KEY environment variable in .env.local file."
  );
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const metadataSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "The main title of the web page.",
    },
    description: {
      type: Type.STRING,
      description:
        "The meta description of the page, or a concise one-sentence summary if no meta description is found.",
    },
  },
  required: ["title", "description"],
};

export const fetchLinkMetadata = async (
  url: string
): Promise<[string, string]> => {
  if (!API_KEY) {
    throw new Error("API_KEY is not configured for Gemini service.");
  }
  try {
    const prompt = `Analyze the content of the following URL: ${url}. Extract the main title of the page and its meta description. If a meta description is not available, provide a concise one-sentence summary of the page's main content.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: metadataSchema,
      },
    });

    const jsonString = response.text;
    const metadata = JSON.parse(jsonString);

    return [metadata.title || "", metadata.description || ""];
  } catch (error) {
    console.error("Error fetching metadata from Gemini:", error);
    throw new Error(
      "Failed to fetch metadata. The URL might be inaccessible or the content is protected."
    );
  }
};
