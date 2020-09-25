
var gameState=1;
var play=1;
var end=0;
var monkey , monkey_running,monkey_stop ,ground, invisibleGround,gameOver;
var banana ,bananaImage, obstacle, obstacleImage, groundImage,gameOverImage;
var FoodGroup, obstacleGroup;
var score;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  groundImage = loadImage("groundImage.jpg");
  obstacleImage = loadImage("obstacle.png");
  monkey_stop = loadImage("sprite_6.png");
  gameOverImage = loadImage("game.jpg");
}

function setup() {
  createCanvas(600,400);
  
 ground = createSprite(200,400,400,20); 
 ground.x=ground.width/2;
 ground.addImage(groundImage);
 ground.scale=0.9   ;
 ground.velocityX= 2;
 
 invisibleGround=createSprite(200,400,400,10);
  
  score=createSprite(50,500,20,20);
  
  gameOver = createSprite(300,200,20,20);
  gameOver.addImage(gameOverImage);
  gameOver.scale=1.8;
  gameOver.visible=false;
  
 monkey = createSprite(70,400,20,20);
 monkey.addAnimation("monkey",monkey_running);
 monkey.addAnimation("stop",monkey_stop);
 monkey.scale=0.2;
 monkey.velocityX=0;
  
 score =0;

  
bananaGroup =createGroup();
obstacleGroup = createGroup();
  
}


function draw() {
  background("ground");
  
  if(gameState===play){
  
  ground.velocityX= 2;  
  
  if(ground.x>600)
  ground.x=0 ;
  
   if (frameCount % 60 === 0) {
     
 banana = createSprite(400,120,90,10);
 banana.y = Math.round(random(20,220));  
 banana.addImage(bananaImage);
 banana.scale=0.2;
 banana.lifetime=150;
 banana.velocityX=-4;
 banana.setCollider("circle",0,0);
     
 bananaGroup.add(banana);
     
   }
     
  if (frameCount % 160 === 0){
  obstacle = createSprite(400,120,90,10);   
  obstacle.y = Math.round(random(400,400));
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.2;
  obstacle.lifetime=150;
  obstacle.velocityX=-4; 
  obstacle.setCollider("circle",0,0);
  
  obstacleGroup.add(obstacle);
    
  } 
    
  if(monkey.isTouching(bananaGroup)){
  bananaGroup.destroyEach();
  score = score + 1; 
  }
  
  if(keyDown("space")){
  monkey.velocityY=-10;
  }  
  
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(invisibleGround);
  invisibleGround.visible=false; 
  text("Score:" + score,500,50);
    
  if(monkey.isTouching(obstacleGroup)){
  gameState=end;
  }  
  
  }  
  
  if(gameState===end){
  ground.velocityX=0;
  gameOver.visible=true;
  bananaGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
  bananaGroup.setLifetimeEach(-1);
  obstacleGroup.setLifetimeEach(-1);
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(invisibleGround);
  monkey.changeAnimation("stop",monkey_stop);
  
  }
  drawSprites();
}
