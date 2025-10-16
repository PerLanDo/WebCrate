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

- **Windows**: Double-click `scripts/start-desktop-app.bat`
- **PowerShell**: Run `.\scripts\start-desktop-app.ps1`

### Build Desktop App

```bash
# Build for current platform
npm run electron:build

# Build for specific platforms
npm run electron:build:win    # Windows
npm run electron:build:mac    # macOS
npm run electron:build:linux  # Linux
```

📖 **Full Desktop Documentation**: See [docs/DESKTOP-APP.md](docs/DESKTOP-APP.md) for complete details.

## 🌐 Run as Web App

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## 📁 Project Structure

```
WebCrate/
├── src/                 # Source code
│   ├── components/     # React components
│   ├── services/       # Service layer (API, DB)
│   ├── App.tsx         # Main application component
│   ├── index.tsx       # Application entry point
│   ├── types.ts        # TypeScript type definitions
│   ├── constants.ts    # Application constants
│   └── sample-data.ts  # Sample/mock data
├── electron/           # Electron main process files
├── public/             # Static assets
├── docs/               # Documentation files
├── scripts/            # Utility scripts (.bat, .ps1)
├── dist/               # Build output (generated)
└── build-output/       # Electron build output (generated)
```

## 📚 Documentation

All documentation has been organized in the `docs/` directory:

- [Getting Started Guide](docs/START-HERE.md)
- [Desktop App Guide](docs/DESKTOP-APP.md)
- [Installation Instructions](docs/INSTALLATION.md)
- [Complete Documentation Index](docs/README.md)

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server (web app)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run electron:dev` - Run desktop app in development mode
- `npm run electron:build` - Build desktop app for current platform

### Helper Scripts

Located in `scripts/` directory:

- `start-app.bat/.ps1` - Quick start web application
- `start-desktop-app.bat/.ps1` - Quick start desktop application
- `create-desktop-shortcut.bat/.ps1` - Create desktop shortcuts
