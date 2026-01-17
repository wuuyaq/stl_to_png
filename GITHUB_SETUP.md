# GitHub Pages Setup Instructions

## Quick Start

1. **Create a new GitHub repository**
   - Go to GitHub and create a new repository
   - Name it something like "stl-to-png"
   - Make it Public or Private

2. **Upload files**
   - Go to your new repository
   - Click "Upload files" button
   - Select all files from this directory:
     - `index.html`
     - `app.js`
     - `README.md`
     - `.gitignore`

3. **Commit and push**
   - Add a commit message like "Initial commit"
   - Click "Commit changes"

4. **Enable GitHub Pages**
   - Go to repository Settings
   - Click on "Pages" in the left sidebar
   - Under "Source", select "Deploy from a branch"
   - Select `main` (or `master`) branch
   - Click "Save"

5. **Access your site**
   - Wait 1-2 minutes for deployment
   - Your site will be available at: `https://your-username.github.io/repository-name/`

## Custom Domain (Optional)

To use your own domain:

1. Create a `CNAME` file in this directory
2. Add your domain name (e.g., `www.example.com`)
3. Upload the CNAME file to your repository
4. Configure DNS settings with your domain provider

## Updating the Site

To make changes:

1. Edit files locally
2. Upload changed files to GitHub
3. GitHub Pages will automatically rebuild and deploy

## Troubleshooting

**Site not showing:**
- Wait 1-2 minutes after enabling Pages
- Check GitHub Actions for deployment errors
- Verify files are in the root directory

**404 errors:**
- Make sure `index.html` is in the root
- Check that Pages is enabled in Settings

**CORS errors:**
- Verify Three.js CDN URLs are accessible
- Check browser console for specific errors

## Support

For issues or questions:
- Check the main README.md
- Open an issue on GitHub
