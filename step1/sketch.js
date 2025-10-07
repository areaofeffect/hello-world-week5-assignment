// Step 1: Basic setup - draws a single red circle
// This is the p5.js equivalent of looping-pattern-step1.py

function setup() {
  // Create a 400x400 pixel canvas
  createCanvas(400, 400);

  // Draw only once, not continuously
  noLoop();
}

function draw() {
  // Set background to white
  background(255);

  // Draw a red circle
  fill(255, 0, 0);  // RGB: red
  noStroke();

  // Draw circle at position (50, 50) with diameter 100
  ellipse(50, 50, 100, 100);
}
