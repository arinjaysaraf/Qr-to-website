#!/bin/bash

# GitHub Pages Deployment Script
# This script builds and deploys the React app to GitHub Pages

echo "🚀 Building the React app..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"
echo ""
echo "📦 Deploying to GitHub Pages..."
echo ""

# Check if gh-pages branch exists locally
if git show-ref --verify --quiet refs/heads/gh-pages; then
    echo "gh-pages branch exists locally"
else
    echo "Creating orphan gh-pages branch..."
    git checkout --orphan gh-pages
    git rm -rf .
    git checkout main -- .gitignore
fi

# Copy build files
echo "Copying build files..."
cp -r build/* .

# Add and commit
git add .
git commit -m "Deploy to GitHub Pages - $(date +'%Y-%m-%d %H:%M:%S')"

# Push to remote
echo "Pushing to GitHub..."
git push origin gh-pages --force

# Return to main branch
git checkout main

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your site should be live at: https://arinjaysaraf.github.io/Qr-to-website"
echo ""
echo "⚠️  Don't forget to set GitHub Pages source to 'gh-pages' branch:"
echo "   Settings → Pages → Source: Deploy from a branch → gh-pages"
