var slider1;
var slider2;
var slider3;
var slider4;
var slider5;
var slider6;
var slider7;
var slider8;
var p1;
var p2;
var p3;
var p4;
var p5;
var p6;
var p7;
var p8;
var p11;
var p21;
var p31;
var p41;
var p51;
var p61;
var p71;
var p81;
var checkbox;

function setup() {
  createCanvas(windowWidth - 170, windowHeight - 10); //1200, 600);
  checkbox = createCheckbox('Tick to seek mouse, untick to repel', false);
  numBoids = 100;
  b = [];
  for (i = 0; i < numBoids; i++) {
    b[i] = new boid(random(width), random(height));
  }
  slider1 = createSlider(0, 100, 50);
  slider2 = createSlider(0, 100, 30);
  slider3 = createSlider(0, 100, 25);
  slider4 = createSlider(0, 100, 10);
  slider5 = createSlider(0, 100, 50);
  slider6 = createSlider(0, 100, 50);
  slider7 = createSlider(0, 100, 25);
  slider8 = createSlider(0, 100, 25);
  slider2.position(width, 45)
  slider3.position(width, 90)
  slider4.position(width, 135)
  slider5.position(width, 180)
  slider6.position(width, 225)
  slider7.position(width, 270)
  slider8.position(width, 315)
  p1 = createP("Max Speed");
  p1.position(width + 2, 10);
  p2 = createP("Max Force");
  p2.position(width + 2, 55);
  p3 = createP("Sphere of Influence");
  p3.position(width + 2, 100);
  p4 = createP("Desired Seperation");
  p4.position(width + 2, 145);
  p5 = createP("Seek/Repel Weight");
  p5.position(width + 2, 190);
  p6 = createP("Seperation Weight");
  p6.position(width + 2, 235);
  p7 = createP("Cohesion Weight");
  p7.position(width + 2, 280);
  p8 = createP("Allignment Weight");
  p8.position(width + 2, 325);
  p11 = createP(slider1.value());
  p11.position(width + 135, 10);
  p21 = createP(slider2.value());
  p21.position(width + 135, 55);
  p31 = createP(slider3.value());
  p31.position(width + 135, 100);
  p41 = createP(slider4.value());
  p41.position(width + 135, 145);
  p51 = createP(slider5.value());
  p51.position(width + 135, 190);
  p61 = createP(slider6.value());
  p61.position(width + 135, 235);
  p71 = createP(slider7.value());
  p71.position(width + 135, 280);
  p81 = createP(slider8.value());
  p81.position(width + 135, 325);
  checkbox.position(width + 2, 370);
  setFrameRate(50);
}

function draw() {
  background(156);
  fill(0, 0, 0, 50)
  for (i = 0; i < b.length; i++) {
    b[i].find(b.slice(), i);
    if (checkbox.checked() == true) {
      b[i].seek(mouseX, mouseY);
    }else{
      b[i].repel(mouseX, mouseY);
    }
    b[i].allign();
    b[i].seperation();
    b[i].cohesion(i);
  }
  for (i = 0; i < b.length; i++) {
    b[i].update(slider1.value(), slider2.value(), slider3.value(), slider4.value(), slider5.value(), slider6.value(), slider7.value(), slider8.value());
    if (b[i].pos.x > width + 10) {
      b[i].pos.x = (b[i].pos.x % width) - 10
    }
    if (b[i].pos.x < -10) {
      b[i].pos.x = width + 10
    }
    if (b[i].pos.y > height + 10) {
      b[i].pos.y = (b[i].pos.y % height) - 10
    }
    if (b[i].pos.y < -10) {
      b[i].pos.y = height + 10
    }
    b[i].draw();
  }
  p11.html(slider1.value());
  p21.html(slider2.value());
  p31.html(slider3.value());
  p41.html(slider4.value());
  p51.html(slider5.value());
  p61.html(slider6.value());
  p71.html(slider7.value());
  p81.html(slider8.value());

  if (mouseIsPressed && mouseX < width && mouseY < height) {
    b[b.length] = new boid(mouseX, mouseY);
  }
}

function windowResized() {
  resizeCanvas(windowWidth - 170, windowHeight - 10);
  var width1 = windowWidth - 170
  slider2.position(width1, 45)
  slider3.position(width1, 90)
  slider4.position(width1, 135)
  slider5.position(width1, 180)
  slider6.position(width1, 225)
  slider7.position(width1, 270)
  slider8.position(width1, 315)
  p1.position(width1 + 2, 10);
  p2.position(width1 + 2, 55);
  p3.position(width1 + 2, 100);
  p4.position(width1 + 2, 145);
  p5.position(width1 + 2, 190);
  p6.position(width1 + 2, 235);
  p7.position(width1 + 2, 280);
  p8.position(width1 + 2, 325);
  p11.position(width1 + 135, 10);
  p21.position(width1 + 135, 55);
  p31.position(width1 + 135, 100);
  p41.position(width1 + 135, 145);
  p51.position(width1 + 135, 190);
  p61.position(width1 + 135, 235);
  p71.position(width1 + 135, 280);
  p81.position(width1 + 135, 325);
}
