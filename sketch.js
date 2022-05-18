var trex ,trex_running;
var ground;
var groundImg;
var invisibleGround;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var dado;
var score = 0;
var gameState = "play";
var obstaclesGroup;
var cloudsGroup;
var gameOver;
var restart;
var gameOverImg;
var restartImg;
var trexCollided;
var jumpSound, dieSound, checkpointSound;
function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImg = loadImage("ground2.png");
  cloudImg = loadImage("cloud.png");
  obstacle1 = loadImage ("obstacle1.png");
  obstacle2 = loadImage ("obstacle2.png");
  obstacle3 = loadImage ("obstacle3.png");
  obstacle4 = loadImage ("obstacle4.png");
  obstacle5 = loadImage ("obstacle5.png");
  obstacle6 = loadImage ("obstacle6.png");
  gameOverImg = loadImage ("gameOver.png")
  restartImg = loadImage ("restart.png")
  trexCollided = loadAnimation("trex_collided.png");
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkpointSound = loadSound("checkpoint.mp3");
}

function setup(){
  //createCanvas(600,200)
  createCanvas(windowWidth, windowHeight)
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  gameOver = createSprite(windowWidth/2,windowHeight/2);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  restart = createSprite(windowWidth/2,windowHeight/2 + 40);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;
  //crear sprite de Trex
 
  trex = createSprite (50, windowHeight -30, 20, 40);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("Collided",trexCollided);
  trex.scale = 0.5;
  ground = createSprite (200 ,windowHeight -30 ,400 ,20);
  ground.addImage(groundImg);
  ground.x = ground.width/2;
  
  invisibleGround = createSprite (200, windowHeight -14, 400, 10);
  invisibleGround.visible = false;
  var numAleatorio = Math.round(random (0,10));
  console.log(numAleatorio);


  //trex.debug = true;
  trex.setCollider("circle",0 ,0 ,35)
}




function draw(){
  // hackeando el sistema con el fondo B)
  background(999)
  text ("Puntuacion: " + Math.round (score), windowWidth -150, 50);

  
  if (gameState === "play"){
    score += 1/1;
    ground.velocityX = -(4+3*score/100);
    trex.velocityY = trex.velocityY +0.8;
  
    //Epico
    if (score%100 === 0){
      checkpointSound.play();
    }
    if ((keyDown (UP_ARROW) || touches.length>0) && trex.y>windowHeight -70){
      trex.velocityY = -13
      jumpSound.play();
      touches = [];
      }
      
      if (ground.x<0){
      ground.x = ground.width/2;
      }

      
      
      spawnClouds();
      spawnObstacle(); 
      if (trex.isTouching(obstaclesGroup)){
        gameState = "end"
        dieSound.play();
      }



  }

if (gameState === "end"){
  ground.velocityX = 0;
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  gameOver.visible = true;
  restart.visible = true;
  trex.velocityY = 0;
  trex.changeAnimation("Collided",trexCollided);
  obstaclesGroup.setLifetimeEach(0.57);
  cloudsGroup.setLifetimeEach(-1);
  if (mousePressedOver (restart) || touches.length>0){
    reset();
  }
  
 }
  

  trex.collide(invisibleGround); 
drawSprites();
}


function reset(){
score = 0;
  gameState = "play"
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  gameOver.visible = false
  restart.visible = false
  trex.changeAnimation("running", trex_running);
}



function spawnClouds(){
  if(frameCount%60===0){
    var cloud = createSprite (windowWidth, 50, 40, 20)  
    cloud.y = Math.round(random(10,windowHeight -80))
    cloud.velocityX = -(4+3*score/100);
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.lifetime = 450;
    cloudsGroup.add(cloud);

  }
  

}
function spawnObstacle(){
  if(frameCount%60 === 0){
    var obstacle = createSprite (windowWidth +100, windowHeight -40, 20, 40);
    obstacle.velocityX= -(4+3*score/100);
    dado = Math.round(random(1,6))
    switch(dado){
      case 1: obstacle.addImage(obstacle1); break;
      case 2: obstacle.addImage(obstacle2); break;
      case 3: obstacle.addImage(obstacle3); break;
      case 4: obstacle.addImage(obstacle4); break;
      case 5: obstacle.addImage(obstacle5); break;
      case 6: obstacle.addImage(obstacle6); break;
    }
    obstacle.scale = 0.6
    obstacle.lifetime= 450;
    obstaclesGroup.add(obstacle);
  }
}