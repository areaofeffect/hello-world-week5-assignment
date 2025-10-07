# Looping Patterns Assignment - p5.js

This assignment teaches you how to create generative art patterns using p5.js, focusing on loops, grids, and creative coding techniques.

## Setup Instructions

### Option 1: p5.js Web Editor (Recommended for Beginners)

The easiest way to get started is using the p5.js Web Editor:

1. **Go to the p5.js Web Editor**: [editor.p5js.org](https://editor.p5js.org)
2. **Create an account** (optional but recommended to save your work)
3. **Copy and paste** the code from any step's `sketch.js` file into the editor
4. **Click the Play button** to see your pattern
5. **Modify the code** and experiment!

The web editor automatically handles all the setup - you just need to focus on the creative coding.

### Option 2: Local Development with VS Code (Optional)

For students who want to work locally and get comfortable with a full development environment:

#### Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/)
- The [p5.vscode extension by Sam Lavigne](https://marketplace.visualstudio.com/items?itemName=samplavigne.p5-vscode)

#### Installation Steps

1. **Install Visual Studio Code** from [code.visualstudio.com](https://code.visualstudio.com/)

2. **Install the p5.vscode extension:**
   - Open VS Code
   - Click the Extensions icon (or press `Cmd+Shift+X` on Mac, `Ctrl+Shift+X` on Windows)
   - Search for "p5.vscode" by Sam Lavigne
   - Click Install

3. **Clone or download this repository** to your local machine

4. **Open a step folder** in VS Code:
   - File → Open Folder
   - Select one of the step folders (e.g., `step1/`)

5. **Run the sketch:**
   - Simply open the `index.html` file in your web browser, OR
   - Use the Live Server extension in VS Code:
     - Install "Live Server" extension by Ritwick Dey
     - Right-click on `index.html` and select "Open with Live Server"
   - Your sketch will display in the browser
   - Changes will auto-reload when you save (if using Live Server)

## Learning Path

The files are numbered to guide you through increasingly complex patterns:

### **step1** - Basic Setup
- Draws a single red circle
- Introduces `setup()` and `draw()` functions
- Basic p5.js canvas creation

### **step2** - Canvas Sizing and Smoothing
- Introduces canvas sizing concepts
- Demonstrates smooth rendering (anti-aliasing)
- Shows how to use `pixelDensity()` for high-resolution displays

### **step3** - Grid Layout with Random Colors
- Adds nested loops for 4×4 grid
- Introduces helper functions (`drawCircle()`)
- Uses random RGB colors
- Demonstrates grid-based layouts

### **step4** - Color Palettes
- Integrates predefined color palettes (16 colors)
- Creates harmonious color schemes
- Shows how to use color arrays

### **step5** - Trigonometry and Multiple Circles
- Uses `sin()` and `cos()` to arrange circles in circular patterns
- Introduces `drawMultipleCircles()` function
- Adds alpha channel support for transparency
- Implements outline colors with configurable stroke weight
- Enables image saving with keyboard shortcut (press 's')

### **step6** - High-Resolution Output
- Full HD output (1920×1080)
- 16×9 grid layout
- Configurable alpha for fill and outline separately
- Produces high-resolution exports
- Perfect for wallpapers or prints

### **fibonacci-spiral** - Bonus Golden Ratio Example
- Uses golden ratio mathematics (phi ≈ 1.618)
- Creates a spiral with 800 circles
- Positioned using polar coordinates and the golden angle (≈ 137.5°)
- Demonstrates advanced mathematical patterns in generative art

### **step6-animated** - Animation Showcase (Bonus!)
- Interactive animations with dropdown selector
- Four animation modes:
  - **Rotating**: Circles spin around their centers
  - **Pulsing**: Patterns breathe and grow/shrink rhythmically
  - **Color Shifting**: Colors cycle through the palette
  - **Particles Appearing**: Circles appear progressively
- Demonstrates the p5.js `draw()` loop for continuous animation
- Shows DOM element interaction (dropdown menu)
- Uses `sin()` and `frameCount` for smooth motion
- Press 's' to save a frame

## Creating Your Own Patterns

### Using Different Shapes

The examples use circles, but you can create many other shapes using p5.js drawing functions:

#### Rectangles

```javascript
// Instead of ellipse()
rect(x, y, width, height);
// Or with center mode:
rectMode(CENTER);
rect(x, y, width, height);
```

#### Triangles

```javascript
triangle(x1, y1, x2, y2, x3, y3);
```

#### Polygons (hexagons, stars, etc.)

```javascript
// Hexagon example
function drawHexagon(x, y, radius) {
  beginShape();
  for (let i = 0; i < 6; i++) {
    let angle = TWO_PI / 6 * i;
    let px = x + radius * cos(angle);
    let py = y + radius * sin(angle);
    vertex(px, py);
  }
  endShape(CLOSE);
}
```

#### Lines

```javascript
strokeWeight(5);
line(x1, y1, x2, y2);
```

#### Arcs

```javascript
// Arc (part of a circle)
arc(x, y, width, height, startAngle, endAngle);
// Example: half circle
arc(100, 100, 80, 80, 0, PI);
```

### Design Ideas

Here are some ways to create interesting patterns:

1. **Mix shapes**: Use different shapes in alternating cells

   ```javascript
   if ((i + j) % 2 === 0) {
     drawCircle(...);
   } else {
     drawRectangle(...);
   }
   ```

2. **Vary sizes**: Make shapes grow or shrink across the grid

   ```javascript
   let diameter = 20 + (i * 10);  // Gets bigger as i increases
   ```

3. **Rotate patterns**: Use rotation to create dynamic effects

   ```javascript
   push();  // Save current drawing style
   translate(x, y);  // Move to position
   rotate(angle + i * PI / 8);  // Add rotation per row
   rect(0, 0, 50, 50);
   pop();  // Restore drawing style
   ```

4. **Layer transparency**: Use alpha values to create overlapping effects

   ```javascript
   fill(255, 0, 0, 128);  // 50% transparent red
   ```

5. **Create gradients**: Interpolate between colors across the grid

   ```javascript
   // Fade from first color to last color
   let amount = i / 4;
   let c = lerpColor(color1, color2, amount);
   ```

6. **Combine with math**: Try sine waves, spirals, or random variations

   ```javascript
   let yOffset = sin(i * 0.5) * 50;  // Wave pattern
   ```

### Experimenting with Color

#### Creating Custom Color Palettes

You can create your own color palettes using tools like:
- [coolors.co](https://coolors.co) - Color palette generator
- [Adobe Color](https://color.adobe.com) - Color wheel and themes
- [Paletton](https://paletton.com) - Color scheme designer

#### Using Color Arrays

```javascript
// Create a palette array
let palette = [
  [255, 0, 0],    // Red
  [0, 255, 0],    // Green
  [0, 0, 255],    // Blue
  [255, 255, 0]   // Yellow
];

// Use colors from the palette
let c = palette[i % palette.length];
fill(c[0], c[1], c[2]);
```

#### p5.js Color Functions

```javascript
// HSB color mode (Hue, Saturation, Brightness)
colorMode(HSB, 360, 100, 100);
fill(180, 80, 90);  // Cyan-ish color

// Lerp between colors
let from = color(255, 0, 0);
let to = color(0, 0, 255);
let between = lerpColor(from, to, 0.5);  // Purple
```

## Understanding Key Techniques

### Alpha Blending: p5.js vs Python/Pillow

**Important Note:** You may notice that the p5.js examples look different from Python versions when using transparency (alpha channel). This is because **p5.js and Python/Pillow handle alpha blending differently**.

**In Python/Pillow (PIL):**
- Semi-transparent shapes can use higher alpha values (like 125 out of 255)
- Overlapping areas accumulate gradually, creating subtle layering effects
- The compositing algorithm preserves more translucency

**In p5.js:**
- You need to use much lower alpha values (like 15-30) to achieve similar translucency
- Alpha accumulates faster, making overlapping areas opaque more quickly
- The rendering creates a different aesthetic - often more glowy/ethereal

**Example from step5:**
- Python uses: `alpha = 125` for semi-transparent fills
- p5.js uses: `alpha = 15` to achieve a similar translucent effect

**Tip for students:** Experiment with different alpha values to find what looks best! There's no single "correct" value - it depends on the effect you want to create.

### Anti-Aliasing in p5.js

p5.js automatically applies anti-aliasing to make smooth edges. You can control this:

```javascript
smooth();    // Enable anti-aliasing (default)
noSmooth();  // Disable for pixel-art style
```

For high-resolution displays (like Retina), increase pixel density:

```javascript
pixelDensity(2);  // 2x resolution
pixelDensity(displayDensity());  // Match display
```

### Coordinate Systems

- **p5.js**: `ellipse(x, y, width, height)` draws from the CENTER by default
- You can change this with `ellipseMode(CORNER)` to draw from top-left

### Saving Your Images

Press the 's' key in any of the step5, step6, or fibonacci-spiral examples to save your pattern as a PNG image.

You can also add this to any sketch:

```javascript
function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('my-pattern', 'png');
  }
}
```

## Tips

- Start with step1 and modify it incrementally
- Use `console.log()` to debug your loop values (check browser console)
- Press 's' to save your images (in sketches that have this enabled)
- Increase canvas size for higher resolution, but it may render slower
- Experiment! The best way to learn is to try things and see what happens

## Common p5.js Functions

### Drawing Functions
- `ellipse(x, y, w, h)` - Draw an ellipse/circle
- `rect(x, y, w, h)` - Draw a rectangle
- `line(x1, y1, x2, y2)` - Draw a line
- `triangle(x1, y1, x2, y2, x3, y3)` - Draw a triangle
- `point(x, y)` - Draw a point

### Style Functions
- `fill(r, g, b, a)` - Set fill color
- `stroke(r, g, b, a)` - Set stroke/outline color
- `strokeWeight(w)` - Set stroke thickness
- `noFill()` - Disable fill
- `noStroke()` - Disable stroke

### Transform Functions
- `translate(x, y)` - Move the origin
- `rotate(angle)` - Rotate
- `scale(s)` - Scale
- `push()` - Save current style/transform
- `pop()` - Restore saved style/transform

### Math Functions
- `random(max)` or `random(min, max)` - Random number
- `sin(angle)`, `cos(angle)`, `tan(angle)` - Trigonometry
- `sqrt(n)` - Square root
- `abs(n)` - Absolute value
- `floor(n)`, `ceil(n)`, `round(n)` - Rounding
- `map(value, start1, stop1, start2, stop2)` - Remap a number
- `lerp(start, stop, amt)` - Linear interpolation
- `dist(x1, y1, x2, y2)` - Distance between two points

### Constants
- `PI` - π (3.14159...)
- `TWO_PI` - 2π (6.28318...)
- `HALF_PI` - π/2 (1.57079...)
- `width` - Canvas width
- `height` - Canvas height

## Resources

- [p5.js Reference](https://p5js.org/reference/) - Complete function reference
- [p5.js Examples](https://p5js.org/examples/) - Learn by example
- [The Coding Train](https://thecodingtrain.com/) - Video tutorials by Daniel Shiffman
- [OpenProcessing](https://openprocessing.org/) - Share and explore p5.js sketches
- [Creative Coding with p5.js](https://www.youtube.com/watch?v=HerCR8bw_GE) - Beginner tutorial series

## Need Help?

If you encounter errors:

1. **Check the browser console** (Right-click → Inspect → Console tab)
2. **Read the error message** - p5.js errors usually indicate the line number and what went wrong
3. **Compare your code** to the working examples
4. **Try the p5.js Web Editor** - it has helpful error messages and autocomplete
5. **Ask for help** - share your code and describe what you're trying to do

Happy coding!
