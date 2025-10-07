// Step 4: Introduces color palettes for harmonious color schemes
// This is the p5.js equivalent of looping-pattern-step4.py
// Uses a predefined palette instead of random colors

let canvasWidth = 400;
let canvasHeight = 400;
let cellWidth = 100;
let cellHeight = 100;

// Color palette - 16 colors inspired by seaborn's "Purples" palette
// You can create your own palettes or use tools like coolors.co
let palette = [
  '#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc',
  '#9e9ac8', '#807dba', '#6a51a3', '#54278f',
  '#4a1486', '#3f0f7a', '#350c6e', '#2b0962',
  '#210756', '#17044a', '#0d023e', '#030132'
];

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noLoop();
}

function draw() {
  background(255);

  // Create a 4x4 grid, using palette colors in order
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      console.log("row:", i, "col:", j);

      // Select color from palette based on position
      let colorIndex = 4 * i + j;
      let circleColor = palette[colorIndex];

      drawCircle(
        i * cellWidth,
        j * cellHeight,
        cellWidth,
        circleColor
      );
    }
  }
}

// Helper function to draw circles
function drawCircle(x, y, diameter, circleColor) {
  fill(circleColor);
  noStroke();
  ellipse(x + diameter / 2, y + diameter / 2, diameter, diameter);
}
