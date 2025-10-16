# WebCrate Desktop Installation Guide

## 🎉 Your App is Built and Ready!

The production build has been created in the `dist` folder. You can now install and run WebCrate on your desktop.

---

## 📦 Installation Options

### Option 1: Run with npm (Recommended)

1. Open PowerShell or Command Prompt in this folder
2. Run:
   ```bash
   npm start
   ```
3. Open your browser and go to: http://localhost:3000
4. Keep the terminal window open while using the app

### Option 2: Double-click Script (Windows)

**For PowerShell:**

1. Double-click `start-app.ps1`
2. If you get a security warning, right-click → "Run with PowerShell"

**For Command Prompt:**

1. Double-click `start-app.bat`

The app will open at http://localhost:3000

### Option 3: Use Vite's Preview Server

```bash
npm run preview
```

This will serve the built app with Vite's preview server.

---

## 🖥️ Creating a Desktop Shortcut

### Windows Desktop Shortcut:

1. Right-click on your desktop → New → Shortcut
2. Enter the location:
   ```
   C:\Windows\System32\cmd.exe /c "cd /d C:\Users\Asus\Desktop\Programming\WebCrate\WebCrate && npm start"
   ```
3. Name it "WebCrate"
4. Right-click the shortcut → Properties → Change Icon (optional)
5. Double-click the shortcut to launch the app

---

## 🌐 Deploying to a Web Server

The `dist` folder contains all the files needed for deployment:

### Deploy to Netlify/Vercel/GitHub Pages:

1. Upload the `dist` folder to your hosting service
2. Point your domain to the `dist` folder
3. Done! Your app is live

### Deploy to a Local Web Server:

1. Copy the `dist` folder to your web server directory
2. Configure your server to serve `index.html` for all routes
3. Access via your server's URL

---

## 📝 Important Notes

### Environment Variables

The app uses the Gemini API key from `.env.local`. Make sure this file exists with:

```
VITE_GEMINI_API_KEY=your_api_key_here
```

**Note:** After changing `.env.local`, you need to rebuild:

```bash
npm run build
```

### Browser Requirements

- Modern browser (Chrome, Firefox, Edge, Safari)
- JavaScript enabled
- LocalStorage enabled (for data persistence)

### Data Storage

All your saved links are stored in your browser's LocalStorage. They will persist as long as you use the same browser and don't clear browser data.

---

## 🔄 Rebuilding After Changes

If you make any code changes:

1. Stop the running app (Ctrl+C)
2. Rebuild:
   ```bash
   npm run build
   ```
3. Restart:
   ```bash
   npm start
   ```

---

## 🚀 Advanced: Creating a Desktop App with Electron

If you want a true desktop application (not browser-based), you can wrap this with Electron:

1. Install Electron:

   ```bash
   npm install --save-dev electron
   ```

2. Create an Electron main file and package it

Would you like me to set up Electron for a true desktop app experience?

---

## 💡 Quick Start Commands

```bash
# Development mode (with hot reload)
npm run dev

# Build for production
npm run build

# Run the built app
npm start

# Preview the build
npm run preview
```

---

## ✅ What's Included

- ✅ Optimized production build
- ✅ Minified JavaScript and CSS
- ✅ Gzip-compressed assets (102.78 kB)
- ✅ Fast loading times
- ✅ All features working (dark mode, view modes, Gemini AI)

Enjoy using WebCrate! 🎉
