# STL to PNG Renderer

A simple browser-based tool to render STL 3D models as PNG images from multiple angles.

Additional there is a nodejs script do run this to automate image recognition for llm with STL files.

It also can be used to generate thumbnails from a stl and its lightweight so its easy to change and extend with an LLM, i hope it can help.

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


### Command Line Rendering

For command-line rendering with full control over parameters:

```bash
node render.js <stl-file> [options]
```

**Single Image Mode:**
```bash
node render.js <stl-file> --angle <x,y,z> --output <output.png> [options]
```

**Batch Mode:**
```bash
node render.js <stl-file> --views <number> [options]
```

**Options:**

- `--size, -s <size>` - Image size in pixels (default: 1024)
- `--bg-color, -b <color>` - Background color (default: 0xf0f0f0)
- `--model-color, -m <color>` - Model color (default: 0x4a90d9)
- `--angle, -a <x,y,z>` - Camera angle for single image
- `--output, -o <file>` - Output filename for single image
- `--views, -v <number>` - Number of views for batch mode (default: 16)
- `--output-dir, -d <dir>` - Output directory (default: output)
- `--help, -h` - Show help message

**Examples:**

```bash
# Help
node render.js --help

# Single front view (red on black)
node render.js model.stl --angle 1,0,0 --output front.png --bg-color black --model-color red

# Single top view (blue on white, 512x512)
node render.js model.stl --angle 0,1,0 --output top.png --bg-color white --model-color blue --size 512

# 32 views with 2048x2048 images
node render.js model.stl --views 32 --size 2048

# Custom colors and size
node render.js model.stl --bg-color gray --model-color green --size 1920x1080

# Default 16 views
node render.js model.stl
```

This will create PNG files named `model_view_1.png`, `model_view_2.png`, etc. in specified directory.

**Note:** Command line rendering requires a display environment. If running on a headless server, use the web interface instead.

## Camera Views

The default 16 views are generated using a golden angle distribution algorithm, which ensures even coverage around the 3D object from all angles including diagonal views.

## Lighting Setup

The renderer uses a multi-light setup for optimal visibility:

- Ambient light (40% intensity) for base illumination
- Three directional lights from different angles for highlights
- Hemisphere light for natural sky/ground lighting

## Image Settings

**HTML App (Fixed):**
- Resolution: 1024x1024 pixels
- Background: 0xf0f0f0 (light gray)
- Model Color: 0x4a90d9 (blue)
- Format: PNG with RGBA
- Color space: sRGB

**Node.js Script (Customizable):**
- Resolution: Customizable (default: 1024x1024)
- Background: Customizable (default: 0xf0f0f0)
- Model Color: Customizable (default: 0x4a90d9)
- Format: PNG with RGBA
- Color space: sRGB for accurate colors

Both use identical rendering logic for consistent results.

## License

MIT
