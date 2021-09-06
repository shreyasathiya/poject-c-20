var cycler;
var cycler_animation;
var cycler_hit;
var cycler_won;
var hurdles;
var hurdles_image;
var olympics;
var olympics_image;
var ground;
var invisibleGround;
var ground_image;
var rock_image;
var gameover;
var backgroundSound;
var PLAY= 0;
var win= 1;
var lose=2;
var score=0;
var END=3;
var rand;
var fire_image;
var gameState = PLAY;
var restart;
var gameOverImg,restartImg;
var obstaclesGroup;




function preload(){
cycler_animation=loadAnimation("cycler 1.png","cycler 2.png");
groundImage = loadImage("ground2.png");
olympics_image = loadImage("tokyo.png");
hurdles_image = loadImage("hurdles.jpg");
rock_image = loadImage("rocks.jpg");
fire_image = loadImage("fire.png");
restartImg = loadImage("restart.png");
gameOverImg = loadImage("gameOver.png");
 cycler_won = loadAnimation("trophy.jpg");
 cycler_hit = loadAnimation("cycler_hit.png")
}

function setup() {
  createCanvas(800, 200);
 olympics= createSprite(220,50,20,20);
 olympics.addImage(olympics_image);
 olympics.scale=0.1;

 cycler=createSprite(50,160,20,50);
 cycler.addAnimation("cycling", cycler_animation);
 cycler.scale=0.07;
 cycler.setCollider("rectangle",0,0,200,200);
 cycler.debug = true;

 ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
 

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
 
  obstaclesGroup= createGroup();

}

function draw() {
    background(180);

    text("Score: "+ score, 500,50);

    if(gameState == PLAY){
      
      gameOver.visible = false;
      restart.visible = false;
    
      ground.velocityX=-5;

      if (ground.x < 0){
        ground.x = 300;
      }

      console.log(cycler.y);

      if(keyDown("space") && cycler.y >= 121) {
        cycler.velocityY = -18;  
     }

     spawnObstacles();
  
     score = score + Math.round(getFrameRate()/60);

     cycler.velocityY = cycler.velocityY + 0.8;

     if(score == 2000){
      gameState=END;
      cycler.changeAnimation("trex_running",cycler_won);
      text("you have won the olympics.CONGRATULATIONS!")
     }

      if(obstaclesGroup.isTouching(cycler)){
        gameState=END;
        cycler.changeAnimation("trex_collided",cycler_hit);
        text("you have lost the olympics. try again!")
      }

    }
 

    else if (gameState===END){
    ground.velocityX=0;

    
      restart.visible = true;

    cycler.x=50;
    cycler.y=160;
   
    if(mousePressedOver(restart)) {
      reset();
    }

    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    }
      
       cycler.collide(invisibleGround);
    
       
  
       drawSprites();
  }
    
    
    


function spawnObstacles(){
  if (frameCount % 60 === 0){
   hurdles = createSprite(600,165,10,40);
   hurdles.velocityX = -(6 + score/100);

   var rand = Math.round(random(1,6));
   switch(rand) {
     case 1: hurdles.addImage(hurdles_image);
             break;
     case 2: hurdles.addImage(rock_image);
             break;  
     case 3: hurdles.addImage(fire_image);
             break; 
     default: break;

   }
  
   hurdles.scale=0.07;
   hurdles.lifetime=200;
   obstaclesGroup.add(hurdles)
  }
}

function reset(){
  gameState=PLAY;
  gameOver.visible = false;
  restart.visible = false;
  //cycler.x=50;
  //cycler.y=160;
  cycler.changeAnimation("cycling",cycler_animation);
  obstaclesGroup.destroyEach();
  score=0;
  
}






