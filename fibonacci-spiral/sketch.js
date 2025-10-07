// Fibonacci Spiral: Bonus example using golden ratio mathematics
// Uses phi (≈ 1.618) to create a spiral with 800 circles
// Positioned using polar coordinates and the golden angle (≈ 137.5°)
// This is the p5.js equivalent of looping-pattern-fibonacci-spiral.py

let count = 800;
let scaleFactor = 10;
let offset = 0.0;
let phi;  // golden ratio ≈ 1.618033989, calculated in setup()
// (2 - phi) * 2 * PI is golden angle = c. 2.39996323 radians, or c. 137.5 degrees
let inc;
let originX = 300;
let originY = 300;  // center of the canvas

// Animation variables
let currentCircle = 0;  // Which circle we're currently drawing/erasing
let isDrawing = true;   // true = drawing from center, false = erasing from outside
let animationSpeed = 3; // How many circles to draw/erase per frame

// Color palette - "Purples_r" (reversed) inspired palette (16 colors)
let palette = [
  [3, 1, 50], [13, 2, 62], [33, 7, 86], [66, 9, 122],
  [103, 21, 142], [135, 44, 162], [164, 77, 180], [189, 113, 195],
  [209, 146, 206], [224, 176, 216], [235, 202, 226], [243, 224, 235],
  [248, 239, 244], [251, 247, 250], [253, 252, 253], [255, 255, 255]
];

function setup() {
  createCanvas(600, 600);

  // Calculate the golden ratio
  phi = (1 + sqrt(5)) / 2.0;  // ≈ 1.618033989

  // Calculate the golden angle increment
  inc = (2 - phi) * TWO_PI + offset;

  // Enable animation loop
  frameRate(30);
}

function draw() {
  background(255);

  // Update animation state
  if (isDrawing) {
    // Drawing phase: grow from center
    currentCircle += animationSpeed;
    if (currentCircle >= count) {
      currentCircle = count;
      isDrawing = false;  // Switch to erasing
    }
  } else {
    // Erasing phase: shrink from outside
    currentCircle -= animationSpeed;
    if (currentCircle <= 0) {
      currentCircle = 0;
      isDrawing = true;  // Switch back to drawing
    }
  }

  // Draw circles from 1 to currentCircle
  let theta = 0;
  for (let j = 1; j <= currentCircle; j++) {
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

    drawCircle(x, y, 10, fillColor);
  }
}

// Helper function to draw circles
function drawCircle(x, y, diameter, fillColor) {
  fill(fillColor);
  noStroke();  // No outline for cleaner spiral
  ellipse(x, y, diameter, diameter);
}

// Press 's' to save the canvas as an image
function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('fibonacci-spiral', 'png');
  }
}
