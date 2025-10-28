let angle = 0;
let angleSpeed = 0.02;
let radius = 120;
let wavePoints = [];
let maxWavePoints = 200;
let isPaused = false;

function setup() {
  let canvas = createCanvas(900, 500);
  canvas.parent("sketch-container");
}

function draw() {
  background(26, 26, 26);

  // Update angle
  if (!isPaused) {
    angle += angleSpeed;
  }

  // If mouse is over the left half, use mouse position to control angle
  if (mouseX > 0 && mouseX < width / 2 && mouseY > 0 && mouseY < height) {
    let centerX = width / 4;
    let centerY = height / 2;
    angle = atan2(mouseY - centerY, mouseX - centerX);
  }

  // Calculate positions
  let centerX = width / 4;
  let centerY = height / 2;
  let x = cos(angle) * radius;
  let y = sin(angle) * radius;

  // Draw unit circle section
  drawUnitCircle(centerX, centerY, x, y);

  // Draw wave section
  drawWaves(centerX * 2 + 50, centerY, x, y);

  // Store wave point
  wavePoints.push({ x: x, y: y, angle: angle });
  if (wavePoints.length > maxWavePoints) {
    wavePoints.shift();
  }
}

function drawUnitCircle(cx, cy, x, y) {
  push();

  // Draw axes
  stroke(80);
  strokeWeight(1);
  line(cx - radius - 30, cy, cx + radius + 30, cy); // x-axis
  line(cx, cy - radius - 30, cx, cy + radius + 30); // y-axis

  // Draw circle
  noFill();
  stroke(80);
  strokeWeight(2);
  circle(cx, cy, radius * 2);

  // Draw angle arc
  stroke(100, 150, 255, 100);
  strokeWeight(2);
  noFill();
  let arcEnd = angle;
  if (angle < 0) arcEnd = TWO_PI + angle;
  arc(cx, cy, 60, 60, 0, arcEnd);

  // Draw radius line to point
  stroke(255, 255, 100);
  strokeWeight(2);
  line(cx, cy, cx + x, cy + y);

  // Draw cos line (horizontal projection)
  stroke(100, 200, 255);
  strokeWeight(3);
  line(cx, cy, cx + x, cy);

  // Draw sin line (vertical projection)
  stroke(255, 100, 150);
  strokeWeight(3);
  line(cx + x, cy, cx + x, cy + y);

  // Draw dotted lines to axes
  drawingContext.setLineDash([5, 5]);
  stroke(100, 200, 255, 100);
  strokeWeight(1);
  line(cx + x, cy, cx + x, cy + radius + 20);

  stroke(255, 100, 150, 100);
  line(cx + x, cy + y, cx + radius + 20, cy + y);
  drawingContext.setLineDash([]);

  // Draw point on circle
  fill(255, 255, 100);
  noStroke();
  circle(cx + x, cy + y, 12);

  // Pixel coordinates label
  fill(255, 255, 100);
  textSize(12);
  textAlign(LEFT);
  let pixelX = Math.round(cx + x);
  let pixelY = Math.round(cy + y);
  text("(" + pixelX + ", " + pixelY + ")", cx + x + 15, cy + y - 10);

  // Labels
  fill(100, 200, 255);
  noStroke();
  textSize(16);
  textAlign(CENTER);
  text("cos(θ) = " + cos(angle).toFixed(2), cx + x / 2, cy - 10);

  fill(255, 100, 150);
  text("sin(θ) = " + sin(angle).toFixed(2), cx + x + 40, cy + y / 2);

  fill(255, 255, 255);
  textSize(14);
  text("θ = " + (angle % TWO_PI).toFixed(2) + " rad", cx, cy - radius - 15);
  text("(" + (degrees(angle) % 360).toFixed(0) + "°)", cx, cy - radius + 2);

  pop();
}

function drawWaves(startX, centerY, currentX, currentY) {
  push();

  // Draw axes
  stroke(80);
  strokeWeight(1);
  line(startX, centerY, startX + 400, centerY);

  // Draw wave trails
  noFill();

  // Cosine wave (blue)
  stroke(100, 200, 255);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < wavePoints.length; i++) {
    let px = startX + i * 2;
    let py = centerY - wavePoints[i].x;
    vertex(px, py);
  }
  endShape();

  // Sine wave (pink)
  stroke(255, 100, 150);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < wavePoints.length; i++) {
    let px = startX + i * 2;
    let py = centerY - wavePoints[i].y;
    vertex(px, py);
  }
  endShape();

  // Current value indicators
  let currentWaveX = startX + wavePoints.length * 2;

  // Cos indicator
  fill(100, 200, 255);
  noStroke();
  circle(currentWaveX, centerY - currentX, 8);

  // Sin indicator
  fill(255, 100, 150);
  circle(currentWaveX, centerY - currentY, 8);

  // Labels
  fill(100, 200, 255);
  textSize(16);
  textAlign(LEFT);
  text("cos(θ)", startX + 10, centerY - radius - 10);

  fill(255, 100, 150);
  text("sin(θ)", startX + 10, centerY - radius + 10);

  // Draw reference lines
  stroke(80);
  strokeWeight(1);
  drawingContext.setLineDash([2, 4]);
  line(startX, centerY - radius, startX + 400, centerY - radius);
  line(startX, centerY + radius, startX + 400, centerY + radius);
  drawingContext.setLineDash([]);

  // +1 and -1 labels
  fill(150);
  textSize(12);
  textAlign(RIGHT);
  text("+1", startX - 5, centerY - radius + 5);
  text("-1", startX - 5, centerY + radius + 5);

  pop();
}

function mousePressed() {
  isPaused = !isPaused;
}
