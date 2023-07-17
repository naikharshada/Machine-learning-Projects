let video;

let label = 'waiting...';

let classifier;
//step 1: Load the model
function preload() {
  classifier = ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/rymbs3AEM/model.json');
}

let square;
let rez = 20;
let food;
let w;
let h;

function setup() {
  createCanvas(640,520);
    
//step 2: start classifying
 classifyAudio();
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(2);
  square = new Square();
  foodLocation();
}

function classifyAudio() {
  classifier.classify(gotResults);
}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}

function controlSquare() {
  if(label === 'left') {
    square.setDir(-1, 0);
    
  } else if (label === 'right') {
    square.setDir(1, 0);
             
  } else if (label === 'down') {
    square.setDir(0, 1);
               
  } else if(label === 'up') {
     square.setDir(0, -1);          
  } 
 
}

function draw() {
  background(220);
  //textAlign(CENTER, CENTER)
  textSize(32);
  fill(255);
  text(label, 10, 50);
  
   scale(rez);
  if (square.eat(food)) {
    foodLocation();
  }
  square.update();
  square.show();
  
  if (square.endGame()) {
    print('End Game');
    background(255, 0, 0);
    noLoop();
  }
  
  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1); 
}

//step 3. get the classification
function gotResults(error, results) {
  if(error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  controlSquare();
  classifyAudio();
  
}