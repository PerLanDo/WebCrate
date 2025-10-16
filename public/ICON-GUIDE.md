# Icon Setup Guide

## Quick Steps to Add Your Icon:

### Step 1: Create or Find Your Icon

- **Size**: 512x512 or 1024x1024 pixels (PNG format)
- **Background**: Can be transparent or solid color
- **Style**: Simple, recognizable design works best

### Step 2: Save the Icon

Save your PNG file as: `public/icon.png`

### Step 3: Alternative - Use an Online Tool

If you don't have an icon yet, you can:

1. **Generate from Text/Emoji:**

   - Visit: https://favicon.io/favicon-generator/
   - Enter text or emoji (like 📦, 🔗, or "WC")
   - Download the generated icons
   - Rename the largest PNG to `icon.png`

2. **Convert Existing Image:**

   - Visit: https://favicon.io/favicon-converter/
   - Upload any image
   - Download and extract
   - Use the largest PNG file

3. **Use Free Icon Libraries:**
   - https://icons8.com (search for "crate" or "link")
   - https://www.flaticon.com
   - Download as PNG, 512x512 or larger

### Step 4: For Windows .ico Format (Optional)

If you want a proper Windows icon:

- Visit: https://convertio.co/png-ico/
- Upload your `icon.png`
- Download as `icon.ico`
- Save both files in the `public/` folder

### Current Icon Configuration:

The app is configured to look for icons at:

- `public/icon.png` (main icon, will be auto-converted)
- `public/icon.ico` (Windows-specific, optional)
- `public/icon.icns` (macOS-specific, optional)

electron-builder will automatically convert PNG to the required formats!

## Example: Quick Emoji Icon

Want a quick start? You can use an emoji as an icon:

1. Go to https://favicon.io/emoji-favicons/
2. Search for an emoji (📦, 🔗, 💾, etc.)
3. Download the favicon package
4. Extract and rename the largest PNG to `icon.png`
5. Place it in the `public/` folder

Done! Your icon is ready.
