# Interactive Avatar Integration

## Files Created
1. `assets/images/avatar.svg` - The SVG avatar image
2. `assets/js/avatar-animation.js` - Animation logic
3. `assets/css/avatar.css` - Styling

## How to Use

### 1. Add CSS and JS to your HTML

Add these lines in the `<head>` section of your `index.html`:

```html
<!-- Avatar styles -->
<link rel="stylesheet" href="assets/css/avatar.css">
```

Add this before the closing `</body>` tag:

```html
<!-- Avatar animation script -->
<script src="assets/js/avatar-animation.js"></script>
```

### 2. Add Avatar to Your Page

#### Option A: In the Hero Section
Replace or add this in your hero section:

```html
<div id="interactive-avatar" class="avatar-container floating">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
        <!-- Copy the entire SVG content from avatar.svg -->
    </svg>
</div>
```

#### Option B: In the About Section
Add next to your profile photo:

```html
<div class="about-avatar">
    <div id="interactive-avatar" class="avatar-container">
        <object data="assets/images/avatar.svg" type="image/svg+xml"></object>
    </div>
</div>
```

#### Option C: Floating Corner Element
Add as a fixed element in the corner:

```html
<div id="interactive-avatar" class="avatar-container" style="position: fixed; bottom: 20px; right: 20px; z-index: 1000;">
    <object data="assets/images/avatar.svg" type="image/svg+xml"></object>
</div>
```

## Features

### 1. **Eye Tracking**
- Eyes follow cursor movement across the entire page
- Smooth transitions for natural movement
- Pupils move within realistic boundaries

### 2. **Hover Interactions**
- Avatar smiles when you hover over it
- Eyebrows wiggle playfully
- Slight scale-up effect with glow

### 3. **Random Blinking**
- Eyes blink naturally every 3-5 seconds
- Quick, realistic blink animation

### 4. **Floating Animation**
- Optional gentle floating motion
- Add class `floating` to enable

### 5. **Responsive Design**
- Scales appropriately on mobile devices
- Touch-friendly interactions

## Customization

### Change Avatar Colors
Edit the SVG in `avatar.svg`:
- Face gradient: `#ffd4a3` to `#ffb380`
- Hair: `#2c1810`
- Eyes: `#2c1810` (iris), `#000` (pupil)

### Adjust Eye Movement Range
In `avatar-animation.js`, line ~60:
```javascript
const normalizedDistance = (distance / 200) * 3; // Change '3' for more/less movement
```

### Modify Blink Frequency
In `avatar-animation.js`, line ~42:
```javascript
setInterval(() => this.blink(), 3000 + Math.random() * 2000); // Change timing
```

### Toggle Glasses
In `avatar.svg`, change the glasses opacity:
```html
<g id="glasses" opacity="0">  <!-- 0 = hidden, 0.9 = visible -->
```

## Where to Place It

### Recommended Placements:

1. **Hero Section** - Next to or instead of your photo
2. **About Section** - As an illustrated version of yourself
3. **Contact Section** - To make the contact form more engaging
4. **Fixed Corner** - As a persistent interactive element
5. **404 Page** - To make error pages more friendly

## Browser Compatibility
- Works in all modern browsers
- Requires JavaScript enabled
- SVG support required (available in all modern browsers)

## Performance
- Lightweight (~5KB for SVG + ~3KB for JS)
- Smooth 60fps animations
- No external dependencies
- Optimized for minimal CPU usage
