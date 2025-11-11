# Tymofii Pidlisnyi - Personal Portfolio Website

A modern, minimalist portfolio website showcasing projects, work history, and creative experiments.

## 🌟 Features

- **Animated Background**: Floating orbs, moving gradients, and grain texture
- **Dark/Light Theme Toggle**: Seamless theme switching with localStorage persistence
- **Profile Overlay**: Interactive bio popup on photo hover
- **Work Timeline**: Chronological career history with company logos
- **Ideas Lab**: Upvotable startup concepts with comments system
- **Project Showcase**: Cards for active and past projects
- **Responsive Design**: Mobile-friendly layouts
- **Cookie Consent Banner**: GDPR-compliant cookie notice

## 📁 Project Structure

```
portfolio/
├── index.html              # Main homepage
├── bio.html                # Extended biography page
├── my_photo.jpg            # Your profile photo
├── evatar_logo.PNG         # Evatar.ai logo
├── OFNATURE_LOGO.PNG       # ofNature logo
├── peropero_logo.png       # Pero Pero logo
└── mywork/                 # Work history detail pages
    ├── index.html          # Work history main page
    ├── evatar.html
    ├── elegatto.html
    ├── ofnature.html
    ├── peropero.html
    ├── authoritytech.html
    ├── njf.html
    ├── hayi.html
    ├── allset.html
    ├── legrem.html
    ├── amplifier-agency.html
    ├── m1tv.html
    ├── prompt-director.html
    ├── aeoess.html
    ├── sheethappens.html
    ├── pickapoo.html
    └── creative-projects.html
```

## 🚀 GitHub Deployment Instructions

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and log in
2. Click the **+** icon in the top right and select **New repository**
3. Name your repository (e.g., `portfolio` or `tymofii-pidlisnyi`)
4. Choose **Public** visibility
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **Create repository**

### Step 2: Prepare Your Files

1. Create a new folder on your computer called `portfolio`
2. Copy all files from this project into that folder:
   - `index.html`
   - `bio.html`
   - `my_photo.jpg`
   - Logo images (evatar_logo.PNG, OFNATURE_LOGO.PNG, peropero_logo.png)
   - The entire `mywork/` folder with all HTML pages

### Step 3: Initialize Git and Push

Open Terminal (Mac) or Command Prompt (Windows), navigate to your portfolio folder, and run:

```bash
# Navigate to your portfolio folder
cd /path/to/your/portfolio

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Portfolio website"

# Add your GitHub repository as remote
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **main** branch
5. Click **Save**
6. Your site will be live at: `https://YOUR_USERNAME.github.io/portfolio/`

## 🎨 Customization

### Updating Your Photo

Replace `my_photo.jpg` with your own photo. Recommended specs:
- Square aspect ratio (1:1)
- At least 500x500px
- JPG or PNG format

### Changing Theme Colors

Edit the CSS variables in `index.html` and `bio.html`:

```css
:root {
    --bg: #0F0E0D;              /* Dark background */
    --accent-cyan: #5DADE2;     /* Primary accent */
    --accent-yellow: #F4D03F;   /* Secondary accent (dark mode) */
}

[data-theme="bright"] {
    --bg: #FDFCFA;              /* Light background */
    --accent-yellow: #B8E6D5;   /* Pale mint (light mode) */
}
```

### Adding New Projects

1. Open `index.html`
2. Find the `<div class="projects-grid">` section
3. Copy an existing project card and modify:

```html
<div class="project-card">
    <span class="project-tag active">Active</span>
    <h3>Your Project Name</h3>
    <p>Description of your project</p>
    <a href="https://yourproject.com" target="_blank">yourproject.com →</a>
</div>
```

### Updating Work History

1. Open `index.html`
2. Find the `<div class="timeline">` section
3. Add/edit timeline items following the existing format
4. Maintain reverse chronological order (newest first)

## 🔧 Local Development

To test locally before deploying:

1. Simply open `index.html` in your browser
2. Or use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js (if you have http-server installed)
npx http-server

# Then open http://localhost:8000 in your browser
```

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

**Images not loading?**
- Check file names match exactly (case-sensitive)
- Ensure images are in the correct folder
- Verify image paths in HTML

**Theme not switching?**
- Clear browser cache
- Check browser console for JavaScript errors

**GitHub Pages not working?**
- Wait 5-10 minutes after enabling Pages
- Check that `index.html` is in the root directory
- Verify repository is public

## 📝 License

This is your personal portfolio. All rights reserved.

## 🤝 Contact

- Email: tima@aeoess.com
- LinkedIn: [Tymofii Pidlisnyi](https://linkedin.com/in/tymofii-pidlisnyi)
- Instagram: [@tima.fey](https://instagram.com/tima.fey)

---

Built with ❤️ and lots of coffee ☕
