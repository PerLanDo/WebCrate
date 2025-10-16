// Simple HTTP server to serve the built app
import { createServer } from "http";
import { readFile } from "fs/promises";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3000;
const DIST_DIR = join(__dirname, "dist");

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const server = createServer(async (req, res) => {
  let filePath = join(DIST_DIR, req.url === "/" ? "index.html" : req.url);

  try {
    const content = await readFile(filePath);
    const ext = extname(filePath);
    const mimeType = MIME_TYPES[ext] || "application/octet-stream";

    res.writeHead(200, { "Content-Type": mimeType });
    res.end(content);
  } catch (error) {
    if (error.code === "ENOENT") {
      // Serve index.html for SPA routing
      try {
        const indexContent = await readFile(join(DIST_DIR, "index.html"));
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(indexContent);
      } catch (err) {
        res.writeHead(404);
        res.end("Not found");
      }
    } else {
      res.writeHead(500);
      res.end("Server error");
    }
  }
});

server.listen(PORT, () => {
  console.log(`\n✅ WebCrate is running at http://localhost:${PORT}`);
  console.log(`\nPress Ctrl+C to stop the server\n`);
});
