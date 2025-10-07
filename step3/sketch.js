// Step 3: Nested loops for 4x4 grid, helper function, random RGB colors
// This is the p5.js equivalent of looping-pattern-step3.py

let canvasWidth = 400;
let canvasHeight = 400;
let cellWidth = 100;
let cellHeight = 100;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noLoop();
}

function draw() {
  background(255);

  // Create a 4x4 grid
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      console.log("row:", i, "col:", j);

      // Random color for each circle
      let r = random(255);
      let g = random(255);
      let b = random(255);

      drawCircle(
        i * cellWidth,
        j * cellHeight,
        cellWidth,
        color(r, g, b)
      );
    }
  }
}

// Helper function to draw circles
function drawCircle(x, y, diameter, circleColor) {
  fill(circleColor);
  noStroke();
  // Note: p5.js ellipse uses center coordinates, not top-left like PIL
  // So we offset by half the diameter
  ellipse(x + diameter / 2, y + diameter / 2, diameter, diameter);
}
