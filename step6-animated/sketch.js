// Step 6 Animated: Interactive animations with dropdown selector
// Demonstrates 4 different animation techniques with p5.js

let canvasWidth = 800;
let canvasHeight = 600;
let cellWidth = 800 / 8;
let cellHeight = 600 / 6;

// Animation variables
let animationMode = 'rotating';
let rotationAngle = 0;
let pulseAmount = 0;
let colorOffset = 0;
let appearProgress = 0;

// Dropdown selector
let selector;

// Color palette - "twilight" inspired palette (16 colors)
let palette = [
  [226, 217, 211], [213, 199, 205], [195, 184, 203], [176, 171, 203],
  [157, 161, 204], [140, 152, 205], [125, 144, 205], [113, 136, 204],
  [105, 128, 201], [102, 120, 196], [104, 112, 189], [111, 105, 180],
  [122, 100, 169], [136, 97, 157], [151, 96, 145], [167, 98, 135]
];

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  // Get the dropdown selector from the HTML
  selector = select('#animationSelect');
  selector.changed(changeAnimation);
}

function draw() {
  // Black background
  background(0);

  // Update animation variables based on mode
  updateAnimationVariables();

  // Create an 8×6 grid to fill the canvas
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 6; j++) {
      let colorIndex = (8 * j + i) % palette.length;

      drawMultipleCircles(
        i * cellWidth + cellWidth / 2,
        j * cellHeight + cellHeight / 2,
        cellWidth,
        colorIndex,
        16
      );
    }
  }
}

function updateAnimationVariables() {
  switch(animationMode) {
    case 'rotating':
      rotationAngle += 0.02;
      break;
    case 'pulsing':
      pulseAmount = sin(frameCount * 0.05) * 20;
      break;
    case 'colorShift':
      colorOffset = (colorOffset + 0.1) % palette.length;
      break;
    case 'appearing':
      appearProgress = (sin(frameCount * 0.02) + 1) / 2; // 0 to 1
      break;
  }
}

function changeAnimation() {
  animationMode = selector.value();
  // Reset animation variables
  rotationAngle = 0;
  pulseAmount = 0;
  colorOffset = 0;
  appearProgress = 0;
}

// Helper function to draw a single circle
function drawCircle(x, y, diameter, fillColor, strokeColor) {
  fill(fillColor);
  stroke(strokeColor);
  strokeWeight(2);
  ellipse(x, y, diameter, diameter);
}

// Helper function to draw multiple circles with animation
function drawMultipleCircles(centerX, centerY, diameter, colorIndex, number) {
  let angle = TWO_PI / number;

  // Apply animation-specific modifications
  let currentDiameter = diameter;
  let currentColorIndex = colorIndex;
  let currentRotation = 0;

  switch(animationMode) {
    case 'rotating':
      currentRotation = rotationAngle;
      break;
    case 'pulsing':
      currentDiameter = diameter + pulseAmount;
      break;
    case 'colorShift':
      currentColorIndex = floor((colorIndex + colorOffset) % palette.length);
      break;
  }

  let circleColor = palette[currentColorIndex];
  let fillColor = color(circleColor[0], circleColor[1], circleColor[2], 15);
  let strokeColor = color(circleColor[0], circleColor[1], circleColor[2], 30);

  for (let i = 0; i < number; i++) {
    // Calculate if this circle should be visible (for appearing animation)
    if (animationMode === 'appearing') {
      let circleProgress = i / number;
      if (circleProgress > appearProgress) {
        continue; // Skip this circle
      }
    }

    let newX = sin(angle * i + currentRotation) * currentDiameter / 4 + centerX;
    let newY = cos(angle * i + currentRotation) * currentDiameter / 4 + centerY;

    drawCircle(newX, newY, currentDiameter / 2, fillColor, strokeColor);
  }
}

// Press 's' to save the canvas as an image
function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('animated-pattern', 'png');
  }
}
