# How to Change Your App Icon - Quick Guide

## ✅ I've Created a Temporary Icon for You!

A simple icon has been created at `public/icon.svg` with a "W" for WebCrate.

## 🎯 Quick Options to Use It:

### Option 1: Convert SVG to PNG Online (Easiest)

1. Open the file `public/icon.svg` in your browser
2. Right-click → "Save image as" → Save as PNG
3. Or visit: https://svgtopng.com/
4. Upload `public/icon.svg`
5. Set size to 512x512
6. Download as `icon.png`
7. Save to `public/` folder

### Option 2: Use a Free Icon Instead

Pick a ready-made icon from:

- **📦 Emoji Icons**: https://favicon.io/emoji-favicons/link/
- **🎨 Icon Libraries**: https://icons8.com or https://www.flaticon.com

Download as PNG (512x512 or larger) and save as `public/icon.png`

### Option 3: Create Your Own

Use any design tool:

- Canva: https://www.canva.com
- Figma: https://www.figma.com
- Or even PowerPoint!

Export as PNG, 512x512 pixels, save as `public/icon.png`

## 📁 File Locations

Your icon files should be:

```
public/
  ├── icon.png    ← Main icon (REQUIRED)
  ├── icon.svg    ← Source file (optional, for editing)
  └── icon.ico    ← Windows icon (optional, auto-generated)
```

## 🔧 Icon is Already Configured!

The package.json is already set up to use `public/icon.png` for:

- ✅ Windows builds (`.exe`, `.msi`)
- ✅ macOS builds (`.dmg`, `.app`)
- ✅ Linux builds (`.AppImage`, `.deb`)

electron-builder will automatically convert your PNG to all needed formats!

## 🚀 Test Your Icon

After adding `icon.png`:

1. **In Development:**

   ```bash
   npm run electron:dev
   ```

   The icon appears in the taskbar/dock

2. **In Built App:**
   ```bash
   npm run electron:build:win
   ```
   The icon appears on the installer and installed app

## 💡 Pro Tips

- **Size**: 512x512 or 1024x1024 pixels works best
- **Format**: PNG with transparent background looks professional
- **Simple**: Icons should be recognizable even when small (16x16)
- **Colors**: Use colors that work on both light and dark backgrounds

---

**Current Status:** You have a placeholder SVG icon. Convert it to PNG or replace with your own design!
