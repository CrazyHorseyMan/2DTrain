let tutButton
let tutorial = false
let tutorialSound
let button
let aus = true
let sifa=0
let sifaPiep
let sifaZwangse
let speed =6
let plateOffset= 0
let plateYellow = []
let plateWhite =[]
let score = 1000
let upcomingVmax
let vMaxTrigger = 0
let triggerd = false;
let scenarioDir;
let vMax = [120, 140, 80];
let currentVmax = 80;
let vMaxOrt = [50000, 120000, 170000];
let vMaxNext = [40000, 1190000, 160000];
let catOffset = 0;
let statAccuracy;
let statCount = 1;
let distanceNextStation;
let rip;
let bumper;
let Bumper2;
let bumperX2 = 188222;
let bumperX = -400;
let gleisX = [-300, 40000, 62170, 120973, 132000, 153807, 187222];
let gleis = [];
let cityBG = [];
let cityX = [0];
let bildEm;
let bildB3;
let bildB2;
let bildB1;
let bildIdle;
let bildA1;
let bildA2;
let bildA3;
let motorSound;
let motorCounter = 0;
let l1000hz;
let l1000hzaus;
let l500hzaus;
let lb40;
let l85;
let l85aus;
let l70;
let l70aus;
let l55aus;
let therzVmaxneu = false;
let fhherzVmaxneu = false;
let neuVmaxZeit = 0;
let pzbVmax = 40;
let zwangseAn = false;
let zwangsbremse;
let zwangseStop;
let zugbeinflussung;
let pzbAn = false;
let pzbStoer;
let pzbFrei;
let pzbWach;
let pzbBefehl; //nicht benutzbar,da überfahrt eines roten signals
//nicht möglich sein wird
let startprogramm = 0;
let playerTrain;
let player;
let cat = []; //für Oberleitung
let positionX = 0;
let xcat0 = 0;
let xcat1 = 650;
let xcat2 = 1300;
let xcat3 = -650;
let direction = 1;
function setup() {
  createCanvas(800, 500);
  player = new Player(playerTrain);
  tutButton=createButton("Tutorial")
  tutButton.position(600,400)
    button =createButton("Sifa Isolierschalter")
  button.position(10,400)
  pzbBefehl = createButton("Pzb Befehl");
  pzbBefehl.position(10, 450);
  pzbFrei = createButton("Pzb Frei");
  pzbFrei.position(85, 450);
  pzbWach = createButton("Pzb Wachsam");
  pzbStoer = createButton("Pzb Störschalter");
  pzbStoer.position(10, 425);
  pzbWach.position(10, 475);
  pzbFrei.mousePressed(frei);
  tutButton.mousePressed(tutSoundPlay);
  pzbWach.mousePressed(wach);
  pzbBefehl.mousePressed(befehl);
  pzbStoer.mousePressed(stoerschalter);
  scenarioDir = 0;
}
function preload() {
    sifaPiep=loadSound("sifaSound.mp3")
  sifaZwangse=loadSound("zwangse.mp3")
  bumper2 = loadImage("bumper2.png");
  rip = loadSound("rip.mp3");
  bumper = loadImage("bumper.png");
  for (let c = 0; c <= 4; c++) {
    cityBG[c] = loadImage("city.png");
  }
  for (let plateload = 0; plateload < 4; plateload++) {
    plateYellow[plateload] = loadImage("speedSignNext.png");
    plateWhite[plateload] = loadImage("speedSign.png");
  }
  for (let p = 0; p <= 6; p++) {
    gleis[p] = loadImage("bahnsteig.png");
  }
  zugbeinflussung = loadSound("zugbeinflussung.mp3");
  tutorialSound = loadSound("tutorial.mp3")
  bildEm = loadImage("gangEmergency.png");
  bildB3 = loadImage("gangb3.png");
  bildB2 = loadImage("gangb2.png");
  bildB1 = loadImage("gangb1.png");
  bildIdle = loadImage("gangIdle.png");
  bildA1 = loadImage("ganga1.png");
  bildA2 = loadImage("ganga2.png");
  bildA3 = loadImage("ganga3.png");
  playerTrain = loadImage("br426.png");
  for (let i = 0; i <= 100; i++) {
    cat[i] = loadImage("oberleitung.png");
    zugbeinflussung = loadSound("zugbeinflussung.mp3");
  }
  zwangsbremse = loadSound("zwangse.mp3");
  l85 = loadImage("i85.png");
  l85aus = loadImage("i85aus.png");
  l70 = loadImage("i70.png");
  l70aus = loadImage("i70aus.png");
  l55aus = loadImage("i55aus.png");
  lb40 = loadImage("b40.png");
  l500hzaus = loadImage("i500hzaus.png");
  l1000hz = loadImage("i1000hz.png");
  l1000hzaus = loadImage("i1000hzaus.png");
  motorSound = loadSound("motor.mp3");
}
function draw() {
  score = score - 1/50
  vMaxNext[0] = vMaxNext[0]-player.speed
  vMaxNext[1] = vMaxNext[1]-player.speed
  vMaxNext[2] = vMaxNext[2]-player.speed
  vMaxOrt[0] = vMaxOrt[0]-player.speed
  vMaxOrt[1] = vMaxOrt[1]-player.speed
  vMaxOrt[2] = vMaxOrt[2]-player.speed
  catOffset = catOffset - player.speed;
  bumperX = bumperX - player.speed;
  bumperX2 = bumperX2 - player.speed;
  motorCounter = motorCounter + 1;
  if (motorCounter === 10) {
    motorCounter = 0;
    if (player.state != "idle" && player.speed != 0) {
      motorSound.play();
    }
  }
  background(220);
  fill(51, 204, 51);
  gleisX[0] = gleisX[0] - player.speed;
  gleisX[1] = gleisX[1] - player.speed;
  gleisX[2] = gleisX[2] - player.speed;
  gleisX[3] = gleisX[3] - player.speed;
  gleisX[4] = gleisX[4] - player.speed;
  gleisX[5] = gleisX[5] - player.speed;
  gleisX[6] = gleisX[6] - player.speed;
  cityX[0] = cityX[0] - player.speed;
  image(cityBG[0], cityX[0] + positionX, 130, 600, 200);
  rect(-10, 320, 1000, 1000);
  player.paint(direction, positionX);
  fill("gray");
  rect(-1000, 381, 4000, 12);
  fill(51, 153, 255);
  rect(0, 393, 800, 200);
  for (let catspawn = 0; catspawn <= 100; catspawn++) {
    image(cat[catspawn], -650 + catspawn * 650 + catOffset, 43, 650, 350);
  }
  if (catOffset < -63700) {
    for (let catspawn = 0; catspawn <= 100; catspawn++) {
      image(cat[catspawn], 63050 + catspawn * 650 + catOffset, 43, 650, 350);
    }
  }
  if (catOffset < -127400) {
    for (let catspawn = 0; catspawn <= 100; catspawn++) {
      image(cat[catspawn], 127400 + catspawn * 650 + catOffset, 43, 650, 350);
    }
  }

  if (this.speed === 0) {
    fherzVmaxneu = false;
  }
  if (therzVmaxneu === true && pzbAn === true) {
    image(l1000hz, 300, 450, 50, 50);
  } else {
    image(l1000hzaus, 300, 450, 50, 50);
    pzbVmax = 165;
  }
  image(l55aus, 200, 400, 50, 50);
  image(lb40, 200, 450, 50, 50);
  image(l70aus, 250, 400, 50, 50);
  image(l500hzaus, 250, 450, 50, 50);
  if (pzbAn) {
    image(l85, 300, 400, 50, 50);
  } else {
    image(l85aus, 300, 400, 50, 50);
  }
  if (therzVmaxneu === true) {
    neuVmaxZeit += 1 / 50;
    if (neuVmaxZeit > 30) {
      therzVmaxneu = false;
      pzbVmax = 85;
    }
  }
  if (fhherzVmaxneu === true) {
    neuVmaxZeit += 1 / 50;
    if (neuVmaxZeit > 15) {
      therzVmaxneu = false;
      pzbVmax = 25;
      if ((player.speed = 0)) {
        fhherzVmaxneu = false;
      }
    }
  }
  zwangseStop = false;
  textSize(32);
  fill("black");
  if (player.speed < 0) {
    text(-int(player.speed * 4) + " km/h", 375, 425);
  } else {
    text(int(player.speed * 4) + " km/h", 375, 425);
  }
  fill("white");
  if (pzbAn) {
    startprogramm += 1 / 50;
  }
  if (zwangseAn === true) {
    if (zwangsbremse.isPlaying()) {
    } else {
      zwangsbremse.play();
    }
  }
  if (
    (startprogramm < 10 && player.speed > 11 && pzbAn === true) ||
    (startprogramm < 10 && player.speed < -11 && pzbAn === true)
  ) {
    player.state = "emergency";
    player.accel = -5;
    startprogramm = 0;
    zwangseAn = true;
  }
  if (
    (this.speed > pzbVmax / 4 && pzbAn === true) ||
    (this.speed < -pzbVmax / 4 && pzbAn === true)
  ) {
    player.accel = -5;
    player.state = "emergency";
    startprogramm = 0;
    zwangseAn = true;
    pzbVmax = 45;
  }
  if (player.state === "emergency") {
    image(bildEm, 500, 450, 50, 50);
  }
  if (player.state === "b3") {
    image(bildB3, 500, 450, 50, 50);
  }
  if (player.state === "b2") {
    image(bildB2, 500, 450, 50, 50);
  }
  if (player.state === "b1") {
    image(bildB1, 500, 450, 50, 50);
  }
  if (player.state === "idle") {
    image(bildIdle, 500, 450, 50, 50);
  }
  if (player.state === "a1") {
    image(bildA1, 500, 450, 50, 50);
  }
  if (player.state === "a2") {
    image(bildA2, 500, 450, 50, 50);
  }
  if (player.state === "a3") {
    image(bildA3, 500, 450, 50, 50);
  }
  image(gleis[0], gleisX[0] + positionX, 293);
  image(gleis[1], gleisX[1] + positionX, 293);
  image(gleis[2], gleisX[2] + positionX, 293);
  image(gleis[3], gleisX[3] + positionX, 293);
  image(gleis[4], gleisX[4] + positionX, 293);
  image(gleis[5], gleisX[5] + positionX, 293);
  image(gleis[6], gleisX[6] + positionX, 293);
  image(bumper, bumperX + positionX, 281);
  image(bumper2, bumperX2 + positionX, 281);
  statAccuracy = int((gleisX[statCount] + positionX + 650 - scenarioDir) / 15);
  if (statAccuracy < 0) {
    statAccuracy = -statAccuracy;
  }
  if (statAccuracy < 20 && player.speed === 0) {
    if (statCount < 6) {
      statCount += 1;
    } else {
      fill("black");
      rect(0, 0, 800, 500);
      fill("white");
      text("Glückwunsch! Du hast das Szenario abgeschlossen!", 50, 50);
      pzbStoer.position(1000, 4250);
      pzbWach.position(10000, 4750);
      pzbFrei.position(8500, 4500);
      pzbBefehl.position(85, 4500000);
      button.position(85, 4500000);
      tutButton.position(85, 4500000);
    }
  }
  distanceNextStation = statAccuracy + "m bis zur nähsten Station";
  fill("black");
  if(direction === 1){
    if (vMaxTrigger===0){
      upcomingVmax = 120
    }
    if ( vMaxTrigger === 1){
      upcomingVmax = 140
    }
    if ( vMaxTrigger === 2){
      upcomingVmax = 80
      if(vMaxOrt[vMaxTrigger]<160000){
         tausend()
      }
    }
    if (vMaxOrt[vMaxTrigger]<= 0 &&vMaxTrigger===0){
      vMaxTrigger = 1
      currentVmax = 120
    }
    if (vMaxOrt[vMaxTrigger]<=0 && vMaxTrigger === 1){
      vMaxTrigger = 2
      currentVmax = 140
    }
    if (vMaxOrt[vMaxTrigger]<=0 && vMaxTrigger === 2){
      currentVmax = 80
    }
  }  
  text("Vmax: "+currentVmax,375,450)
  text("Vmax: "+upcomingVmax +" km/h in "+ int(vMaxOrt[vMaxTrigger]/15)+" m",20,75)
  text(distanceNextStation, 20, 50);
    if (player.speed > (currentVmax+5)/4) {
    fill("black");
    rect(0, 0, 800, 500);
    pzbStoer.position(1000, 4250);
    pzbWach.position(10000, 4750);
    pzbFrei.position(8500, 4500);
    pzbBefehl.position(85, 4500000);
    button.position(85, 4500000);
      tutButton.position(85, 4500000);
    fill("white");
    text("Du Bist Entgleist!!!!!!!!!", 0, 40);
    if (rip.isPlaying()) {
    } else {
      rip.play();
    }
  }
  plateOffset = plateOffset- player.speed
  image(plateYellow[0],40000-positionX-plateOffset,293,100,100)
  image(plateYellow[1],100000-positionX+plateOffset,293,100,100)
  image(plateYellow[2],160000-positionX+plateOffset,293,100,100)
  image(plateWhite[0],50000-positionX+plateOffset,293,100,100)
  image(plateWhite[1],110000-positionX+plateOffset,293,100,100)
  image(plateWhite[2],170000-positionX+plateOffset,293,100,100)
   button.mousePressed(sifaIsolierung)
  fill("white")
  if (sifa >1500|| aus === true ){
    fill("yellow")
  }
  if (speed < 5){
    sifa = 0
  }
  if (sifa >1625){
    sifaPiep.play()
  }
  if (sifa >1750){
    sifaPiep.stop()
    if(sifaZwangse.isPlaying()){
      
    }else{
      sifaZwangse.play()
    }
    
  }
  rect(550,450,50,50)
  fill("white")
  if (aus===false){
    sifa = sifa + 1
  }

  if (player.x + 600 <= bumperX + positionX) {
    fill("black");
    rect(0, 0, 800, 500);
    pzbStoer.position(1000, 4250);
    pzbWach.position(10000, 4750);
    pzbFrei.position(8500, 4500);
    pzbBefehl.position(85, 4500000);
    button.position(85, 4500000);
    tutButton.position(85, 4500000);
    fill("white");
    text("Du Bist Entgleist!!!!!!!!!", 0, 40);
    if (rip.isPlaying()) {
    } else {
      rip.play();
    }
  }
  if (player.x + 575 >= bumperX2) {
    fill("black");
    rect(0, 0, 800, 500);
    pzbStoer.position(1000, 4250);
    pzbWach.position(10000, 4750);
    pzbFrei.position(8500, 4500);
    pzbBefehl.position(85, 4500000);
    tutButton.position(85, 4500000);
    fill("white");
    text("Du Bist Entgleist!!!!!!!!!", 0, 40);
    if (rip.isPlaying()) {
    } else {
      rip.play();
    }
    if (vMaxNext[2]<300 &&triggered===false){
      triggered = true
      tausend()
    }
    
}
  
}
function keyPressed() {
  if(keyCode===81){
    sifa = 0
    sifaPiep.stop()
  }
  if (keyCode === 83 && player.speed === 0) {
    direction = direction * -1;
    if (positionX === 0) {
      positionX = 651;
    } else {
      positionX = 0;
    }
  }
  //a keycode= 65
  if (keyCode === 65) {
    player.slowdown();
  }
  // skeycode =68
  if (keyCode === 68) {
    player.accelerate();
  }
  if (keyCode === 81) {
    sifa = 0;
    sifaPiep.stop();
    zugbeinflussung.play();
  }
}

function frei() {
  zugbeinflussung.play();
  if (zwangseAn === false) {
    startprogramm = 11;
    pzbVmax = 165;
  }
  zwangseStop = true;
  if (player.speed === 0) {
    zwangseAn = false;
    neuVmaxZeit = 0;
    fHerzVmaxneu = false;
  }
}
function wach() {
  console.log("wachsam");
  zugbeinflussung.play();
}
function befehl() {
  console.log("befehl");
  zugbeinflussung.play();
}
function stoerschalter() {
  zugbeinflussung.play();
  if (pzbAn === true) {
    pzbAn = false;
  } else {
    pzbAn = true;
    startprogramm = 0;
  }
}
function tausend() {
  neuVmaxZeit = 0;
  therzVmaxneu = true;
  console.log("test")
}
function sifaIsolierung(){
  if(aus === true){
    aus = false
  }else{
   aus= true
    sifa =0
  }
}
function tutSoundPlay(){
  if(tutorialSound.isPlaying()){
    
  }else{
    tutorialSound.play()
  }
}
