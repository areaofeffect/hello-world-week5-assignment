// Step 5: Multiple circles using trigonometry (sin/cos) for circular arrangements
// Adds alpha channel support, outline colors with configurable width
// Enables image saving
// This is the p5.js equivalent of looping-pattern-step5.py

// COMPARISON MODE: Canvas is 2x2 (800x800) to test 4 different blend approaches
let canvasWidth = 800;
let canvasHeight = 800;
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
  noLoop();
}

function draw() {
  background(0);  // Black background

  // Draw labels for each quadrant
  fill(255);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text("MULTIPLY", 100, 5);
  text("BLEND (default)", 500, 5);
  text("ADD", 100, 405);
  text("BLEND (low alpha)", 500, 405);

  // Top-left quadrant: MULTIPLY blend mode
  push();
  translate(0, 20);
  blendMode(MULTIPLY);
  drawGrid(0, 0, 125); // alpha = 125
  pop();

  // Top-right quadrant: Default BLEND mode (alpha 125)
  push();
  translate(400, 20);
  blendMode(BLEND);
  drawGrid(0, 0, 125); // alpha = 125
  pop();

  // Bottom-left quadrant: ADD blend mode
  push();
  translate(0, 420);
  blendMode(ADD);
  drawGrid(0, 0, 125); // alpha = 125
  pop();

  // Bottom-right quadrant: BLEND mode with low alpha
  push();
  translate(400, 420);
  blendMode(BLEND);
  drawGrid(0, 0, 40); // alpha = 40 (much lower)
  pop();

  // Reset blend mode
  blendMode(BLEND);
}

// Helper function to draw the 4x4 grid with specified blend mode and alpha
function drawGrid(offsetX, offsetY, alphaValue) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      // Select color from palette based on position
      let colorIndex = 4 * i + j;
      let circleColor = palette[colorIndex];

      drawMultipleCircles(
        offsetX + i * cellWidth + cellWidth / 2,  // Center of cell
        offsetY + j * cellHeight + cellHeight / 2,  // Center of cell
        cellWidth,
        circleColor,
        16,  // number of circles to draw
        alphaValue
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
function drawMultipleCircles(centerX, centerY, diameter, circleColor, number, alphaValue) {
  // Calculate angle between each circle
  let angle = TWO_PI / number;

  // Create fill and stroke colors with different alpha values
  // Fill color with specified alpha transparency
  let fillColor = color(circleColor[0], circleColor[1], circleColor[2], alphaValue);
  // Outline color with full opacity (255 alpha)
  let strokeColor = color(circleColor[0], circleColor[1], circleColor[2], 255);

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
