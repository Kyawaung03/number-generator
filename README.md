# Number Generator

A beautiful and modern number generator web application built with vanilla JavaScript, HTML, and CSS.

## Features

✨ **Core Features:**
- Generate 1-9 unique numbers
- Automatic constraint checking:
  - No twin numbers (11, 22, etc)
  - No sequential numbers (no ±1 increment)
- One-click copy to clipboard
- Quick preset buttons (1, 3, 5, 7, 9)
- Fully responsive design
- Dark mode support

🎨 **Design:**
- Modern UI with gradient colors (Red #E31E24 & Gold #C89B3C-#F0D27A)
- Smooth animations and transitions
- Background video support
- Glassmorphism effects
- Mobile-first responsive design

♿ **Accessibility:**
- ARIA labels for screen readers
- Keyboard navigation support
- Focus visible states
- Reduced motion support
- High contrast support

## Project Structure

```
number-generator/
├── index.html              # Main HTML file
├── css/
│   ├── styles.css         # Main styles
│   ├── animations.css     # Animations
│   └── responsive.css     # Media queries
├── js/
│   ├── generator.js       # Core generator logic
│   ├── settings.js        # Settings management
│   └── ui.js              # UI interactions
├── assets/
│   ├── logo.png          # Logo
│   ├── videos/
│   │   └── background.mp4 # Background video
│   ├── sounds/
│   │   └── ping.mp3      # Optional sound
│   └── icons/            # UI icons
├── .gitignore
└── README.md
```

## Usage

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd number-generator
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Using Live Server (VS Code extension)
```

3. Visit `http://localhost:8000`

### Customization

#### Update Logo
Replace `assets/logo.png` with your own logo file.

#### Update Background Video
Replace `assets/videos/background.mp4` with your own video file.

#### Change Colors
Edit the CSS variables in `css/styles.css`:
```css
:root {
    --color-red: #E31E24;
    --color-gold-light: #F0D27A;
    --color-gold-dark: #C89B3C;
    --color-white: #FFFFFF;
    --color-black: #000000;
}
```

#### Adjust Amount Range
In `index.html`, modify the slider range:
```html
<input type="range" min="1" max="9" value="1">
```

## Algorithm Explanation

The generator uses the following logic:

1. **Uniqueness**: Each generated number appears only once (0-9)
2. **No Twins**: Excludes numbers like 11, 22, 33, etc.
3. **No Sequential**: Prevents consecutive numbers differing by 1 (e.g., 2→3, 5→4)

### Example Valid Sequences:
- `1, 3, 5, 7, 9` ✓
- `5, 2, 8, 0, 3` ✓
- `9, 6, 1, 4` ✓

### Example Invalid Sequences:
- `1, 2, 3` ✗ (sequential)
- `3, 4, 7` ✗ (3 and 4 are sequential)
- `5, 5, 8` ✗ (duplicate)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

This project follows:
- WCAG 2.1 Level AA standards
- Web Content Accessibility Guidelines
- Semantic HTML practices
- Keyboard navigation support

## Performance

- Lightweight: ~30KB total (uncompressed)
- No external dependencies
- Fast generation: <50ms
- Optimized animations with GPU acceleration
- Responsive layout with minimal repaints

## License

© 2024 Number Generator. All rights reserved.

---

**Made with ❤️**