// Fibonacci Spiral: Bonus example using golden ratio mathematics
// Uses phi (≈ 1.618) to create a spiral with 800 circles
// Positioned using polar coordinates and the golden angle (≈ 137.5°)
// This is the p5.js equivalent of looping-pattern-fibonacci-spiral.py

let count = 800;
let scaleFactor = 10;
let offset = 0.0;
let phi = (1 + sqrt(5)) / 2.0;  // golden ratio ≈ 1.618033989
// (2 - phi) * 2 * PI is golden angle = c. 2.39996323 radians, or c. 137.5 degrees
let inc;
let theta = 0;
let originX = 300;
let originY = 300;  // center of the canvas

// Color palette - "Purples_r" (reversed) inspired palette (16 colors)
let palette = [
  [3, 1, 50], [13, 2, 62], [33, 7, 86], [66, 9, 122],
  [103, 21, 142], [135, 44, 162], [164, 77, 180], [189, 113, 195],
  [209, 146, 206], [224, 176, 216], [235, 202, 226], [243, 224, 235],
  [248, 239, 244], [251, 247, 250], [253, 252, 253], [255, 255, 255]
];

function setup() {
  createCanvas(600, 600);

  // Calculate the golden angle increment
  inc = (2 - phi) * TWO_PI + offset;

  noLoop();
}

function draw() {
  background(255);

  // Draw 800 circles in a golden spiral pattern
  for (let j = 1; j <= count; j++) {
    // Calculate radius based on square root for spiral growth
    let r = scaleFactor * sqrt(j);

    // Increment angle by golden angle
    theta += inc;

    // Convert polar to cartesian coordinates
    let x = originX + r * cos(theta);
    let y = originY + r * sin(theta);

    // Select color from palette (cycle through colors)
    let colorIndex = j % palette.length;
    let circleColor = palette[colorIndex];

    // Fill color with full opacity
    let fillColor = color(circleColor[0], circleColor[1], circleColor[2], 255);
    // Outline color with no opacity (invisible outline)
    let strokeColor = color(circleColor[0], circleColor[1], circleColor[2], 0);

    drawCircle(x, y, 10, fillColor, strokeColor);
  }
}

// Helper function to draw circles
function drawCircle(x, y, diameter, fillColor, strokeColor) {
  fill(fillColor);
  stroke(strokeColor);
  strokeWeight(1);
  ellipse(x, y, diameter, diameter);
}

// Press 's' to save the canvas as an image
function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('fibonacci-spiral', 'png');
  }
}
