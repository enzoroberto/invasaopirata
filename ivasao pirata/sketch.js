const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;

var engine, world, ground;
var backgroundImg;
var tower, towerImg;
var cannon;
var balls = [ ];
var boats = [];
var boatspritedata;
var boatspritesheet;
var brokenboatspritedata;
var brokenboatspritesheet;
var boatanimation =  [ ];
var brokenboatanimation = [ ];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImg = loadImage("./assets/tower.png");
  boatspritedata = loadJSON ("./assets/boat/boat.json");
  boatspritesheet = loadImage ("./assets/boat/boat.png");
  brokenboatspritedata = loadJSON ("./assets/boat/brokenBoat.json");
  brokenboatspritesheet= loadImage ("./assets/boat/brokenBoat.png");


function colisao (S) {
  for( var i = 0; i < boats.length; i++ ) {
    if(balls[S] !== undefined && boats[i] !== undefined) {
      var col = Matter.SAT.collides(balls[S].body, boats[i].body)
      if(col.collided) {
        boats[i].remove(i);
        World.remove(world, balls[S].body)
        delete balls[S]
      }
    }
  }
}

function showboats () {
  if(boats.length > 0) {
    if(boats[boats.length-1] === undefined || boats[boats.length-1].body.position.x < width-300) {
      var posicoes = [-40, -60, -70, -20];
      var posicao = random(posicoes);
      var boat = new Boat(width, height-100, 170,170,posicao, boatanimation);
      boats.push(boat);
    }
    for(var e = 0; e < boats.length; e++) {
      if(boats[e]) {
        Body.setVelocity(boats[e].body, {x: -0.9, y: 0});
        boats[e].display ();
        boats[e].animate ();
      }
    }
  }
  else {
    var boat = new Boat (width, height - 60, 170, 170, -60, boatanimation);
    boats.push(boat);
  }
}


function showcannonball (ball, i) {
  if(ball) {
    ball.display();
    if(ball.body.position.x >= width || ball.body.position.y >= height - 50){
      ball.remove(i);
    }
  }
}

function keyPressed () {
  if(keyCode === DOWN_ARROW) {
    var ball;
    ball = new Cannonball(cannon.x, cannon.y);
    balls.push(ball);
  }
}

function keyReleased ()  {
  if(keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot ();
  }
}


function setup() {

  angleMode(DEGREES);
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
    
  var options = {
    isStatic: true
  }
  cannon = new Cannon(180, 140, 130, 100, 20);
  ground = Bodies.rectangle(0,height-1, width*2,1,options);
  World.add(world,ground);

  tower = Bodies.rectangle(160,350,160,310,options);
  World.add(world,tower);

  var boatframes = boatspritedata.frames;
  for(var i = 0; i < boatframes.length; i++) {
    var pos = boatframes [i].position;
    var img = boatspritesheet.get (pos.x, pos.y, pos.w, pos.h);
    boatanimation.push (img);
  } 

}

function draw() {
  image(backgroundImg, 0,0, 1200, 600);

  Engine.update(engine);
  for(var i = 0; i < balls.length; i = i + 1 ){
    showcannonball (balls[i], i);
    colisao(i);
  }
  cannon.display ();
  push();
    imageMode(CENTER);
    image(towerImg,tower.position.x, tower.position.y, 160,310);
  pop();
  
  showboats ();
}3