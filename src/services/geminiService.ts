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
        "A brief, focused description of the page content in 1-2 sentences maximum (under 150 characters). Should clearly state what the page is about without unnecessary details.",
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
    const prompt = `Analyze the content of the following URL: ${url}. 
    
Extract:
1. The main title of the page (keep it concise)
2. A brief, focused description (maximum 150 characters, 1-2 sentences)

For the description:
- Focus on WHAT the page is about, not how it looks or its structure
- Be specific and informative
- Avoid marketing language or filler words
- Keep it under 150 characters
- Make it useful for someone deciding whether to visit the link

Example good descriptions:
- "JavaScript tutorial covering async/await and promises"
- "Weather forecast and live conditions for New York City"
- "Open-source project management tool with Kanban boards"

DO NOT include phrases like "This page is about", "The website provides", or "Welcome to".`;

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
