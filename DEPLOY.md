# GitHub Pages Deployment Package

Ready-to-deploy files for GitHub Pages!

## Files in this directory:

### Core Application
- `index.html` - Main HTML file with embedded CSS and imports
- `app.js` - JavaScript module with all application logic

### Documentation
- `README.md` - Project documentation and usage instructions
- `GITHUB_SETUP.md` - Step-by-step guide for GitHub Pages deployment

### Configuration
- `.gitignore` - Git ignore rules for this repository

## Quick Deployment

1. **Create GitHub Repository**
   - Go to github.com and create a new repository
   - Name it something descriptive (e.g., "stl-to-png")

2. **Upload Files**
   - Upload ALL files from this directory to the repository root
   - Files to upload:
     - index.html
     - app.js
     - README.md
     - .gitignore

3. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: main (or master)
   - Save

4. **Access Your Site**
   - Wait 1-2 minutes
   - Visit: https://your-username.github.io/repository-name/

## What This Does

This is a complete browser-based STL to PNG renderer that:
- Works entirely in the browser (no server needed)
- Renders STL files from 16 different angles
- Displays images in a 4x4 grid
- Allows clicking any image to download it
- Supports drag and drop for new STL files

## Testing Locally

Before deploying, test locally:

1. Open `index.html` in your browser
2. Drop an STL file onto the blue drop zone
3. Verify 16 images render correctly
4. Test clicking images to download
5. Test dropping another STL file

## Customization

To modify the renderer, edit:
- `app.js` - JavaScript logic
- `index.html` - CSS styles and HTML structure

## Support

For help:
- Read README.md for usage details
- Read GITHUB_SETUP.md for deployment troubleshooting
- Check browser console for errors

## License

MIT - Feel free to use and modify!
