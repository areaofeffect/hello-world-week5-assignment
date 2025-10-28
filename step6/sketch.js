// Step 6: Full HD output (1920×1080), 16×9 grid layout
// Configurable alpha for fill and outline separately
// Produces high-resolution exports
// This is the p5.js equivalent of looping-pattern-step6.py

let canvasWidth = 1920;
let canvasHeight = 1080;
let cellWidth = 1920 / 16;
let cellHeight = 1080 / 9;

// Color palette - "twilight" inspired palette (16 colors)
let palette = [
  [226, 217, 211], [213, 199, 205], [195, 184, 203], [176, 171, 203],
  [157, 161, 204], [140, 152, 205], [125, 144, 205], [113, 136, 204],
  [105, 128, 201], [102, 120, 196], [104, 112, 189], [111, 105, 180],
  [122, 100, 169], [136, 97, 157], [151, 96, 145], [167, 98, 135]
];

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noLoop();
}

function draw() {
  // Black background
  background(0);

  // Create a 16×9 grid to fill the HD canvas
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 9; j++) {
      drawMultipleCircles(
        i * cellWidth,
        j * cellHeight,
        cellWidth,
        16  // number of circles to draw
      );
    }
  }
}

// Helper function to draw a single circle with fill and outline
function drawCircle(x, y, diameter, fillColor, strokeColor) {
  fill(fillColor);
  stroke(strokeColor);
  strokeWeight(1);
  ellipse(x + diameter / 2, y + diameter / 2, diameter, diameter);
}

// Helper function to draw multiple circles in a circular pattern
function drawMultipleCircles(x, y, diameter, number) {
  // Calculate angle between each circle

  let angle = TWO_PI / number;

  for (let i = 0; i < number; i++) {
    // Use sin and cos to position circles in a circle
    let newX = sin(angle * i) * diameter / 4 + x;
    let newY = cos(angle * i) * diameter / 4 + y;

    // Get color from palette (cycle through if needed)
    let circleColor = palette[i % palette.length];

    // Fill color with no opacity (0 alpha) - only outline visible
    let fillColor = color(circleColor[0], circleColor[1], circleColor[2], 0);
    // Outline color with full opacity (255 alpha)
    let strokeColor = color(circleColor[0], circleColor[1], circleColor[2], 255);

    drawCircle(newX, newY, diameter, fillColor, strokeColor);
  }
}

// Press 's' to save the canvas as a high-resolution image
function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('myImage', 'png');
  }
}
