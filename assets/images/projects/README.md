# Project Images

This folder contains images for all portfolio projects. Each project has its own subfolder.

## Folder Structure

```
projects/
├── indic-belt-society/          # The Indic Belt Society project images
├── traffic-light-rl/            # Adaptive Traffic Light Control using RL
├── academic-grading/            # Academic Grading System
├── catalogue-management/        # Catalogue Management System
└── ice-factory-management/      # Ice Factory Management System
```

## Image Guidelines

### File Naming Convention
- Use descriptive, lowercase names with hyphens
- Examples: `homepage.png`, `dashboard-view.jpg`, `mobile-responsive.png`

### Recommended Images for Each Project

1. **Main Screenshot** - `main.jpg` or `main.png`
   - Hero/landing page or main interface
   - Used as the project card thumbnail

2. **Additional Screenshots**
   - `feature-1.jpg`, `feature-2.jpg`, etc.
   - Showcase different features/pages
   - For individual project detail pages

3. **Demo/Architecture**
   - `architecture.png` - System architecture diagram
   - `demo.gif` - Animated demo (optional)

### Image Specifications

- **Format:** JPG for photos, PNG for screenshots with text
- **Size:** 
  - Main thumbnails: 800x600px or similar aspect ratio
  - Detail images: 1200x800px recommended
  - Keep file sizes under 500KB when possible
- **Quality:** High enough to show detail, compressed for web

### Current Image References in HTML

Update these references in `index.html`:

```html
<!-- Project Card 1 - Indic Belt Society -->
<img src="assets/images/projects/indic-belt-society/main.jpg" alt="The Indic Belt Society">

<!-- Project Card 2 - Traffic Light RL -->
<img src="assets/images/projects/traffic-light-rl/main.jpg" alt="Adaptive Traffic Light Control System">

<!-- Project Card 3 - Academic Grading -->
<img src="assets/images/projects/academic-grading/main.jpg" alt="Academic Grading System">

<!-- Project Card 4 - Catalogue Management -->
<img src="assets/images/projects/catalogue-management/main.jpg" alt="Catalogue Management System">

<!-- Project Card 5 - Ice Factory Management -->
<img src="assets/images/projects/ice-factory-management/main.jpg" alt="Ice Factory Management System">
```

## Tips

- Capture screenshots in light mode for consistency
- Use browser dev tools to set consistent viewport sizes
- Consider adding mockups or diagrams for technical projects
- Add mobile screenshots if project is responsive
- Include before/after comparisons if relevant
