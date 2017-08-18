function boid(x, y) {
  //if (x == null && y == null) {
    //this.pos = createVector(random(width), random(height)); //random(width),random(height));
  //} else {
    this.pos = createVector(x, y)
  //}
  this.vel = createVector(random(-1, 1), random(-1, 1));
  this.acc = createVector(0, 0);
  this.rep = createVector(0, 0);

  this.top = createVector(0, -10 / 3);
  this.right = createVector(1, 1);
  this.left = createVector(-1, 1);

  this.maxSpeed = 1.5;
  this.maxForce = 0.3;


  this.close = [];

  this.sphereOfInfluence = 25;
  this.desiredSeperation = 10;

  this.seekWeight = 1;
  this.seperationWeight = 2;
  this.cohesionWeight = 1;
  this.allignWeight = 1;

  this.draw = function() {
    pointTo = createVector(this.pos.x, this.pos.y);
    pointTo = pointTo.add(this.vel);
    angle = atan2(pointTo.y - this.pos.y, pointTo.x - this.pos.x) + PI / 2 //this.vel.heading() + PI/2
    newTop = createVector(this.top.x, this.top.y);
    newTop = newTop.rotate(angle);
    newRight = createVector(this.right.x, this.right.y);
    newRight = newRight.rotate(angle);
    newLeft = createVector(this.left.x, this.left.y);
    newLeft = newLeft.rotate(angle);
    triangle(newTop.x + this.pos.x, newTop.y + this.pos.y, newRight.x + this.pos.x, newRight.y + this.pos.y, newLeft.x + this.pos.x, newLeft.y + this.pos.y);
  }

  this.appForce = function(force) {
    this.acc.add(force);
  }

  this.followMouse = function() {
    this.vel.x = mouseX - this.pos.x;
    this.vel.y = mouseY - this.pos.y;
    this.vel = this.vel.setMag(1);
  }

  this.update = function(a, b, c, d, e, f, g, h) {
    this.maxSpeed = map(a, 0, 100, 0.2, 3);
    this.maxForce = map(b, 0, 100, 0, 1);
    this.sphereOfInfluence = map(c, 0, 100, 0, 100);
    this.desiredSeperation = d;
    this.seekWeight = map(e, 0, 100, 0, 2);
    this.seperationWeight = map(f, 0, 100, 0, 4);
    this.cohesionWeight = map(g, 0, 100, 0, 4);
    this.allignWeight = map(h, 0, 100, 0, 4);

    this.acc.limit(this.maxForce);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.vel.add(this.rep);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.rep.mult(0);
  }

  this.seek = function(x, y) {
    temp = createVector(this.pos.x, this.pos.y);
    toSeek = createVector(x, y);
    distance = temp.sub(toSeek);
    if (distance.mag() < 100) {
      target = createVector(x, y);
      desired = target.sub(this.pos);
      desired.setMag(this.maxSpeed);
      newHead = desired.sub(this.vel);
      newHead.limit(this.maxForce + 0.5);
      this.appForce(newHead.mult(this.seekWeight));
    }
  }

  this.repel = function(x, y) {
    temp = createVector(this.pos.x, this.pos.y);
    toSeek = createVector(x, y);
    distance = temp.sub(toSeek);
    if (distance.mag() < 100) {
      target = createVector(x, y);
      desired = target.sub(this.pos);
      desired.setMag(this.maxSpeed);
      newHead = desired.sub(this.vel);
      newHead.limit(this.maxForce + 0.5);
      newHead = newHead.mult(-1);
      this.rep.add(newHead.mult(this.seekWeight));
    }
  }

  this.find = function(list, index) {
    this.close.length = 0
    list.splice(index, 1);
    for (h = 0; h < list.length; h++) {
      temp = createVector(this.pos.x, this.pos.y);
      temp = temp.sub(list[h].pos);
      if (temp.mag() < this.sphereOfInfluence) {
        this.close.push(list[h]);
        this.close.push(temp);
        //ellipse(list[h].pos.x, list[h].pos.y,15,15)
      }

    }
  }

  this.allign = function() {
    sum = createVector(0, 0);
    for (m = 0; m < this.close.length; m += 2) {
      sum = sum.add(this.close[m].vel);
    }
    sum = sum.div(this.close.length / 2);
    this.appForce(sum.mult(this.allignWeight));
  }

  this.seperation = function() {
    sum = createVector(0, 0);
    for (y = 1; y < this.close.length; y += 2) {
      if (this.close[y].mag() < this.desiredSeperation) {
        temp = createVector(0, 0);
        temp = this.close[y];
        temp = temp.div(temp.mag());
        sum = sum.add(temp);
      }
    }
    sum = sum.div(this.close.length / 2);
    this.appForce(sum.mult(this.seperationWeight));
  }

  this.cohesion = function(index) {
    sum = createVector(0, 0);
    for (t = 0; t < this.close.length; t += 2) {
      sum = sum.add(this.close[t].pos);
    }
    if (this.close.length > 0) {
      //if (index < 1) {
      //ellipse(sum.x, sum.y, 2, 2);
      //line(sum.x, sum.y, this.pos.x, this.pos.y);
      //}
      sum = sum.div(this.close.length / 2);
      //if (index < 1) {
      //ellipse(sum.x, sum.y, 2, 2);
      //line(sum.x, sum.y, this.pos.x, this.pos.y);
      //}
      sum = sum.sub(this.pos);
      this.appForce(sum * this.cohesionWeight);
    }
  }

}