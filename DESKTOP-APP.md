# WebCrate Desktop App

## Overview

WebCrate is now a native desktop application built with Electron! This means you can run it as a standalone desktop app on Windows, macOS, and Linux.

## Development

### Run in Development Mode

To run the app in development mode with hot-reload:

```bash
npm run electron:dev
```

This will:

1. Start the Vite development server
2. Wait for it to be ready
3. Launch the Electron app

### Run Web Version Only

You can still run the web version:

```bash
npm run dev
```

## Building the Desktop App

### Build for Your Current Platform

```bash
npm run electron:build
```

### Build for Specific Platforms

**Windows:**

```bash
npm run electron:build:win
```

**macOS:**

```bash
npm run electron:build:mac
```

**Linux:**

```bash
npm run electron:build:linux
```

The built applications will be in the `release` folder.

## Distribution

### Windows

- **NSIS Installer**: Full installer with desktop shortcut creation
- **Portable**: Standalone executable that doesn't require installation

### macOS

- **DMG**: Disk image for easy installation
- **ZIP**: Compressed app bundle

### Linux

- **AppImage**: Universal Linux executable
- **DEB**: Debian/Ubuntu package

## Features

- **Native Desktop Experience**: Runs as a standalone application
- **Auto-Updates**: (Can be configured with electron-updater)
- **System Tray Integration**: (Can be added if needed)
- **Native Notifications**: (Can be added if needed)
- **File System Access**: Full access to local file system
- **Offline Support**: Works without internet (except API calls)

## File Structure

```
WebCrate/
├── electron/           # Electron main process files
│   ├── main.js        # Main process entry point
│   └── preload.js     # Preload script for security
├── src/               # React application source
├── dist/              # Built web application
├── release/           # Built desktop applications
└── public/            # Static assets (icons, etc.)
```

## Requirements

- Node.js 16 or higher
- npm or yarn

## API Key Configuration

Make sure to set your `GEMINI_API_KEY` in a `.env.local` file:

```
GEMINI_API_KEY=your_api_key_here
```

## Notes

- The app uses Context Isolation for security
- Node Integration is disabled for security
- Communication between renderer and main process uses IPC

## Troubleshooting

### App won't start

- Make sure all dependencies are installed: `npm install`
- Check that port 5173 is not already in use
- Try clearing node_modules and reinstalling

### Build fails

- Ensure you have the latest version of electron-builder
- For Windows builds on macOS/Linux, you may need Wine
- For macOS builds, you need to be on macOS

## Customization

### Change App Icon

Replace `public/icon.png` with your custom icon (512x512 or 1024x1024 PNG recommended)

### Change App Name

Edit the `productName` in `package.json` under the `build` section

### Modify Window Size

Edit `electron/main.js` and change the `width` and `height` in `createWindow()`
