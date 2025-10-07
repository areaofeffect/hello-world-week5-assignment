// Step 5: Multiple circles using trigonometry (sin/cos) for circular arrangements
// Adds alpha channel support, outline colors with configurable width
// Enables image saving
// This is the p5.js equivalent of looping-pattern-step5.py

let canvasWidth = 400;
let canvasHeight = 400;
let cellWidth = 100;
let cellHeight = 100;

// Color palette - "magma" inspired palette (16 colors)
let palette = [
  [0, 0, 4], [16, 16, 30], [37, 26, 59], [59, 32, 88],
  [84, 35, 107], [110, 36, 115], [136, 41, 115], [162, 49, 109],
  [186, 58, 100], [208, 72, 91], [226, 92, 83], [240, 117, 79],
  [249, 146, 82], [252, 179, 104], [251, 215, 141], [252, 253, 191]
];

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  // Draw black background ONCE in setup, not in draw
  background(0);

  // Don't use noLoop - we'll draw once but let it accumulate
  noLoop();
}

function draw() {
  // DON'T call background() here - let shapes accumulate with alpha blending

  // Create a 4x4 grid, drawing multiple circles in each cell
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      console.log("row:", i, "col:", j);

      // Select color from palette based on position
      let colorIndex = 4 * i + j;
      let circleColor = palette[colorIndex];

      drawMultipleCircles(
        i * cellWidth + cellWidth / 2,  // Center of cell
        j * cellHeight + cellHeight / 2,  // Center of cell
        cellWidth,
        circleColor,
        16  // number of circles to draw
      );
    }
  }
}

// Helper function to draw a single circle with fill and outline
function drawCircle(x, y, diameter, fillColor, strokeColor) {
  fill(fillColor);
  stroke(strokeColor);
  strokeWeight(5);
  ellipse(x, y, diameter, diameter);  // x,y is already the center
}

// Helper function to draw multiple circles in a circular pattern
function drawMultipleCircles(centerX, centerY, diameter, circleColor, number) {
  // Calculate angle between each circle
  let angle = TWO_PI / number;

  // Create fill and stroke colors with different alpha values
  // NOTE: Using much lower alpha (15) because p5.js accumulates differently than Pillow
  // Pillow uses 125 alpha, but p5.js makes things opaque faster
  let fillColor = color(circleColor[0], circleColor[1], circleColor[2], 15);
  // Outline color with low alpha too for better blending
  let strokeColor = color(circleColor[0], circleColor[1], circleColor[2], 30);

  for (let i = 0; i < number; i++) {
    // Use sin and cos to position circles in a circular pattern
    // radius/4 places the circles at a distance from the center
    let newX = sin(angle * i) * diameter / 4 + centerX;
    let newY = cos(angle * i) * diameter / 4 + centerY;

    drawCircle(newX, newY, diameter / 2, fillColor, strokeColor);
  }
}

// Press 's' to save the canvas as an image
function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('myImage', 'png');
  }
}
