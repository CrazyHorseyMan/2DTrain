
function preload(){
  bildEm = loadImage("gangEmergency.png")
  bildB3 = loadImage("gangb3.png")
  bildB2 = loadImage("gangb2.png")
  bildB1 = loadImage("gangb1.png")
  bildIdle = loadImage("gangIdle.png")
  bildA1 = loadImage("gangA1.png")
  bildA2 = loadImage("gangA2.png")
  bildA3 = loadImage("gangA3.png")
}
class Player {
  constructor(playerTrain) {
    this.loco = playerTrain;
    this.state = "idle"; // states:emergency,b3,b2,b1,idle,a1,a2,a3
    this.y = 200;
    this.x = -250;
    this.speed = 0;
    this.forwards = true;
    this.accel = 0;
  }
  paint(dir,posX) {
    if (dir === -1) {
      this.forwards = false;
    }else if(dir === 1){
      this.forwards = true
    }

    image(this.loco, this.x+posX, this.y, 600, 200);
    this.speed = this.speed + this.accel / (100 * dir);
    if (this.speed >= 35) {
      this.speed = 35;
    }
    if (this.speed <= -35) {
      this.speed = -35;
    }
    if (this.speed < 0 && this.forwards === true) {
      this.speed = 0;
    }
    if (this.speed > 0 && this.forwards === false) {
      this.speed = 0;
    }
  }
  slowdown() {
    if (this.state === "b3") {
      this.state = "emergency";
      this.accel = -5;
    }
    if (this.state === "b2") {
      this.state = "b3";
      this.accel = -3;
    }
    if (this.state === "b1") {
      this.state = "b2";
      this.accel = -2;
    }
    if (this.state === "idle") {
      this.state = "b1";
      this.accel = -1;
    }
    if (this.state === "a1") {
      this.state = "idle";
      this.accel = 0;
    }
    if (this.state === "a2") {
      this.state = "a1";
      this.acel = 1;
    }
    if (this.state === "a3") {
      this.state = "a2";
      this.accel = 2;
    }
  }
  accelerate() {
    if (this.state === "a2") {
      this.state = "a3";
      this.accel = 3;
    }
    if (this.state === "a1") {
      this.state = "a2";
      this.accel = 2;
    }
    if (this.state === "idle") {
      this.state = "a1";
      this.accel = 1;
    }
    if (this.state === "b1") {
      this.state = "idle";
      this.accel = 0;
    }
    if (this.state === "b2") {
      this.state = "b1";
      this.accel = -1;
    }
    if (this.state === "b3") {
      this.state = "b2";
      this.accel = -2;
    }
    if (this.state === "emergency" && this.speed === 0) {
      this.state = "idle";
      this.accel = 0;
    }
  }
}
