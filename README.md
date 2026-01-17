# STL to PNG Renderer - GitHub Pages

A simple browser-based tool to render STL 3D models as PNG images from multiple angles.

## Live Demo

Open `index.html` in your browser or visit the GitHub Pages site.

## Usage

1. **Drop STL file** onto the blue drop zone or click to browse
2. The 16 rendered images will be displayed in a 4x4 grid
3. **Click any image** to download it as PNG
4. **Drop another STL file** at any time to render new images

## Features

- **Drag & Drop** - Simply drag STL files onto the page
- **Automatic Rendering** - 16 views generated using golden angle distribution
- **4x4 Grid Layout** - Full-page display with no labels
- **Blue Drop Zone** - Clear visual indicator for file drop area
- **Gray Background** - Matches image background for seamless look
- **Click to Download** - Download individual images by clicking
- **Continuous Workflow** - Drop new files without refreshing
- **No Server Required** - Runs entirely in the browser

## Rendering Settings

- **Image Size:** 1024x1024 pixels
- **Background Color:** 0xf0f0f0 (light gray)
- **Model Color:** 0x4a90d9 (blue)
- **Views:** 16 (golden angle distribution)
- **Zoom:** Auto-calculated for optimal fit

## Technology

- **Three.js** - 3D rendering engine
- **STLLoader** - For loading STL files
- **WebGL** - Hardware-accelerated rendering
- **CDN** - Libraries loaded from unpkg.com

## Browser Support

Requires a modern browser with WebGL support:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## GitHub Pages Setup

This project is ready for GitHub Pages. Simply:

1. Create a new GitHub repository
2. Upload all files from this directory
3. Enable GitHub Pages in repository settings
4. Select the main branch as source

Your site will be available at: `https://username.github.io/repository-name/`

## Files

- `index.html` - Main application (contains all code)
- `app.js` - JavaScript module (separated for clarity)
- `README.md` - This file

## License

MIT
