# Minimal Writing App ✍️

A lightweight, minimalist writing app built with **React (Vite) + Tailwind CSS**.  
It mimics a clean Kindle-like writing experience with essential editing tools.

## ✨ Features
- Minimalist black & white UI
- Rounded editor area with Times New Roman font
- Toolbar with Bold, Italic, Underline, Alignment
- Word count at the top
- Export to **Markdown (.md)** (auto-converts formatting) or **Plain Text (.txt)**

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

## 🌍 Deployment

You can deploy this project easily to **Vercel**, **Netlify**, or **GitHub Pages**.

### Deploy to Vercel
1. Push this project to a GitHub repository.
2. Go to [Vercel](https://vercel.com), import your repo.
3. Set **Build Command** = `npm run build`, **Output Directory** = `dist`
4. Deploy 🚀

### Deploy to GitHub Pages
1. Install gh-pages:  
   ```bash
   npm install gh-pages --save-dev
   ```
2. Add this to `package.json`:  
   ```json
   "homepage": "https://yourusername.github.io/minimal-writing-app",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run:  
   ```bash
   npm run deploy
   ```

---

💡 Enjoy distraction-free writing!
