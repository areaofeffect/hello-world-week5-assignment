// Step 2: Introduces canvas sizing and smooth rendering
// This is the p5.js equivalent of looping-pattern-step2.py
// Note: p5.js uses pixelDensity() for high-resolution displays

let canvasWidth = 400;
let canvasHeight = 400;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  // Enable smooth edges (anti-aliasing)
  // p5.js does this automatically, but you can control it
  smooth();

  // For high-DPI displays (like Retina), you can increase pixel density
  // pixelDensity(2);

  noLoop();
}

function draw() {
  background(255);

  // Draw a red circle that fills the canvas
  fill(255, 0, 0);
  noStroke();
  ellipse(canvasWidth / 2, canvasHeight / 2, canvasWidth, canvasHeight);
}
