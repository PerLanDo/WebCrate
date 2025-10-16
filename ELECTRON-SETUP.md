# WebCrate Desktop App - Quick Start

## Installation Complete! 🎉

Your app has been converted to a native desktop application using Electron.

## Quick Start

### 1. Run the Desktop App in Development Mode

```bash
npm run electron:dev
```

This will start both the Vite dev server and the Electron app.

### 2. Build the Desktop App for Distribution

**For Windows (current platform):**

```bash
npm run electron:build:win
```

This will create:

- A Windows installer (NSIS) in the `release` folder
- A portable executable version

## What Changed?

✅ Added Electron framework for native desktop support
✅ Created main process (`electron/main.js`)
✅ Created preload script for security (`electron/preload.js`)
✅ Updated `package.json` with Electron build configuration
✅ Modified `vite.config.ts` for Electron compatibility
✅ Added new npm scripts for running and building

## Available Commands

| Command                        | Description                       |
| ------------------------------ | --------------------------------- |
| `npm run dev`                  | Run web version only              |
| `npm run electron`             | Run Electron (requires built app) |
| `npm run electron:dev`         | Run in development mode           |
| `npm run electron:build`       | Build for current platform        |
| `npm run electron:build:win`   | Build for Windows                 |
| `npm run electron:build:mac`   | Build for macOS                   |
| `npm run electron:build:linux` | Build for Linux                   |

## Next Steps

1. **Add an App Icon**: Place a 512x512 PNG icon at `public/icon.png`
2. **Customize**: Edit `electron/main.js` to customize window size, title, etc.
3. **Test**: Run `npm run electron:dev` to test the desktop app
4. **Build**: Run `npm run electron:build:win` to create distributable files

## File Structure

```
electron/
  ├── main.js      - Main process (app window, lifecycle)
  └── preload.js   - Secure bridge between main and renderer
```

## Need Help?

See `DESKTOP-APP.md` for detailed documentation.

---

**Happy coding! Your web app is now a desktop app! 🚀**
