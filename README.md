<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# WebCrate - Link Management App

This is a powerful link management application available both as a web app and native desktop app.

View your app in AI Studio: https://ai.studio/apps/drive/1ObPRVZ9Vu9_SdP0H0rjrvaz-J8hLRwqe

## 🚀 Desktop App (New!)

WebCrate is now available as a **native desktop application** for Windows, macOS, and Linux!

### Run Desktop App

```bash
npm run electron:dev
```

Or use the convenient launcher:

- **Windows**: Double-click `start-desktop-app.bat`
- **PowerShell**: Run `.\start-desktop-app.ps1`

### Build Desktop App

```bash
# Build for current platform
npm run electron:build

# Build for specific platforms
npm run electron:build:win    # Windows
npm run electron:build:mac    # macOS
npm run electron:build:linux  # Linux
```

📖 **Full Desktop Documentation**: See [DESKTOP-APP.md](DESKTOP-APP.md) for complete details.

## 🌐 Run as Web App

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
