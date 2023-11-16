var rabbit, rabbit_collided, rabbitImage;
var ground, invisibleGround, groundImage ;
var carrots;
var totalCarrots;
var stone,  background, backgroundImage;
var carrotsGroup,stoneGroup;
var carrotseaten;
var lives_score;
var gameState;

function preload(){
  //rabbit_running = loadAnimation("rabbit1.png","rabbit3.png","rabbit4.png");
  stoneImage = loadImage("stone.png");
  groundImage = loadImage("ground2.png");
  rabbitImage = loadImage("rabbit.png");
  carrotImage= loadImage("carrots.png");
  backgroundImage= loadImage("background.png");
}

function setup() {
  createCanvas(600, 600);
  //background= createSprite(600,295,400,400);
 // background.addImage ("background",backgroundImage);

  //create a rabbit sprite
  rabbit = createSprite(300,520,20,50);
  rabbit.addImage("rabbit",rabbitImage);
  
 // carrots= createSprite(random(10,580),10,5,10);
  //carrots.addImage("carrot",carrotImage);

  //stone= createSprite(random(20,580),25,15,25);
 // stone.addImage("stone",stoneImage);
 
 //totalCarrots=0;
  
  //adding scale and position to rabbit
  rabbit.scale = 0.2;

  
  background.scale= 1;
 
  //create ground sprite
  ground = createSprite(200,width-20,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  carrotsGroup= new Group();
  stoneGroup= new Group();

  rabbit.setCollider("circle",0,0,60);
 
  gameState=1;
  carrotseaten=0;
  lives_score= 100;


  
}
 


function draw() {
background(backgroundImage);
 //background("black");

if(gameState===1){
  eatCarrot();
  rabbitMove();
  spawnCarrots();
  spawnstone();
}
 
  result();
 // ground.velocityX = -2
  
  //carrots.velocityY= 5;
  //stone.velocityY=6;
   
   if(stoneGroup.isTouching(rabbit)){
    lives_score=lives_score-1;

    //if (carrotsGroup.isTouching(rabbit)){
      
   // }
  }
 
  
  
 
  
  //}
  
  stop();

  if(lives_score===0){
    stroke("red");
    textFont("Georgia");
    textSize(50);
    text("Game Over", 150,300);
    
    
    stoneGroup.destroy();
    carrotsGroup.destroy();
    
  }
 
  if(carrotseaten===100){
    stroke("red");
    textFont("Georgia");
    textSize(50);
    text("YOU WON!!", 150,300);
    
    
    stoneGroup.destroy();
    carrotsGroup.destroy();
    
  }
 
 //stop rabbit from falling down 
  
  drawSprites();

 
}



function result(){
  stroke("red");
  textFont("Georgia");
  textSize(17);
  
  text("TOTAL LIVES: "+ lives_score, 400,50);
  text("CARROTS score: "+ carrotseaten, 400,70);

 
}


function spawnCarrots() {
    if(frameCount%60 ===0){
   carrots=createSprite(600,10,40,10);
   carrots.addImage(carrotImage);
   carrots.scale= 0.07;
   carrots.x=Math.round(random(10,520));
   carrots.scale=0.06;
   carrots.velocityY= 5;
   carrotsGroup.add(carrots);
   totalCarrots+=1;
   carrots.life=120;
    //background.depth= rabbit.depth
    //rabbit.depth=rabbit.depth+1 ;
 }
}
  function spawnstone(){
    // write your code here 
    if(frameCount%60 ===0){
     stone=createSprite(600,20,50,20);
     stone.addImage(stoneImage);
     stone.x=Math.round(random(20,530));
     stone.velocityY= 5;
     stone.scale= 0.3;
     stone.scale=Math.round(random(10,10))/40
     stoneGroup.add(stone);
     stone.life=120;
    }
   
   
 }

   function stop(){
    if(keyDown("space")){
      gameState=0;
      rabbit.destroy();
      carrotsGroup.destroy();
      stoneGroup.destroy();
    } 
   }

   function rabbitMove(){
    if(keyIsDown(LEFT_ARROW)){
      rabbit.x = rabbit.x-7;
    }
     
    if(keyIsDown(RIGHT_ARROW)){
      rabbit.x = rabbit.x+7;
    }
   }
   
   function eatCarrot(){
    if(carrotsGroup.isTouching(rabbit)){
      carrotseaten=carrotseaten+1;
    
      console.log("collisionwithCarrot",carrotseaten);
      //carrots.destroy()

      if (stoneGroup.isTouching(rabbit)){
        lives_score= lives_score-1;
      }
    }
   }


   