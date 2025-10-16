// Simple script to create a placeholder icon
// This creates a canvas-based PNG icon for the desktop app

const fs = require("fs");
const path = require("path");

// Create a simple SVG that can be converted
const svgContent = `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <!-- Background with gradient -->
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Rounded rectangle background -->
  <rect width="512" height="512" rx="80" fill="url(#grad)"/>
  
  <!-- Crate/Box icon -->
  <g transform="translate(256, 256)">
    <!-- Main box -->
    <rect x="-140" y="-140" width="280" height="280" rx="20" fill="none" stroke="white" stroke-width="24"/>
    
    <!-- Horizontal divider -->
    <line x1="-140" y1="-40" x2="140" y2="-40" stroke="white" stroke-width="24"/>
    
    <!-- Vertical dividers -->
    <line x1="-40" y1="-140" x2="-40" y2="140" stroke="white" stroke-width="24"/>
    <line x1="40" y1="-140" x2="40" y2="140" stroke="white" stroke-width="24"/>
    
    <!-- Letter W -->
    <text x="0" y="50" font-family="Arial, sans-serif" font-size="120" font-weight="bold" fill="white" text-anchor="middle">W</text>
  </g>
</svg>`;

// Save the SVG (it's already there, but this ensures it's correct)
const publicDir = path.join(__dirname, "public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, "icon.svg"), svgContent);

console.log("✅ SVG icon created at public/icon.svg");
console.log("\n📝 To convert to PNG, you can:");
console.log("1. Open public/icon.svg in a browser");
console.log("2. Use an online converter: https://cloudconvert.com/svg-to-png");
console.log("3. Or use any image editor (GIMP, Photoshop, etc.)");
console.log(
  "\n💡 Make sure to export as 512x512 PNG and save as public/icon.png"
);
