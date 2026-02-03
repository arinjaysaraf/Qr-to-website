# 💕 Will You Be My Valentine? 💕

A romantic, interactive Valentine's Day proposal website built with React, styled like the classic game show "Who Wants to Be a Millionaire?" - personalized for Saanvi!

## ✨ Features

- 🎮 **Game Show Theme**: Styled like "Who Wants to Be a Millionaire" with lifelines and dramatic presentation
- 💖 **4 Romantic Options**: All answers are positive - no way to say no!
- 🎨 **Beautiful Animations**: Smooth transitions, cat emoji celebration, and heart rain
- 📱 **Mobile Friendly**: Fully responsive design that works on all devices
- ⏱️ **60-Second Timer**: Animated countdown clock on the questionnaire page
- 🎯 **Sequential Option Reveal**: Options appear one by one (A → B → C → D) every 5 seconds
- 🌈 **Gradient Backgrounds**: Stunning animated gradients throughout

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

To create a production build:

```bash
npm run build
```

## 🌐 Deploying to GitHub Pages

### Option 1: Using the deployment script (Recommended)

1. Make sure you're authenticated with GitHub (SSH keys or GitHub CLI)

2. Run the deployment script:
   ```bash
   ./deploy.sh
   ```

3. Go to your GitHub repository → **Settings → Pages**
   - Set **Source** to: **Deploy from a branch**
   - Set **Branch** to: **`gh-pages`** / **root**

4. Your site will be live at: `https://arinjaysaraf.github.io/Qr-to-website`

### Option 2: Manual deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Create/switch to gh-pages branch:
   ```bash
   git checkout --orphan gh-pages
   git rm -rf .
   git checkout main -- .gitignore
   ```

3. Copy build files:
   ```bash
   cp -r build/* .
   ```

4. Commit and push:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages --force
   git checkout main
   ```

5. Configure GitHub Pages:
   - Go to **Settings → Pages**
   - Set source to **`gh-pages`** branch

### Option 3: Using npm deploy (requires GitHub authentication)

If you have GitHub credentials configured:

```bash
npm run deploy
```

Then configure GitHub Pages to use the `gh-pages` branch.

## 💡 Customization

- Edit `src/App.js` to change the question, answers, or personalize messages
- Modify colors in `src/App.css`
- Adjust animations timing in the CSS files
- Change the name "Saanvi" throughout the app for personalization

## 🎨 Design Highlights

- Animated gradient background
- Smooth fade-in animations
- Cat emoji celebration effect (😻💖)
- Heart rain animation
- Responsive grid layout
- Modern glassmorphism effects
- Interactive hover states
- Millionaire-style timer and option reveals

## 💝 Perfect For

- Valentine's Day proposals
- Anniversary celebrations
- Special romantic moments
- Creating unforgettable memories!

---

Made with 💕 and React for Saanvi
