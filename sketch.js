var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2,Cyclist;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restartImg,restart;
var peel, peelImg,peelg,peel2

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  Cyclist =  loadAnimation("mainPlayer1.png")

  oppPink1Img = loadAnimation("opponent1.png","opponent2.png");
  oppPink2Img = loadAnimation("opponent3.png");
  
  oppYellow1Img = loadAnimation("opponent4.png","opponent5.png");
  oppYellow2Img = loadAnimation("opponent6.png");
  
  oppRed1Img = loadAnimation("opponent7.png","opponent8.png");
  oppRed2Img = loadAnimation("opponent9.png");
  
  cycleBell = loadSound("bell.mp3");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png")
  peelImg = loadImage("peel.png")
}

function setup(){
  
createCanvas(1280,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
//set collider for mainCyclist
//mainCyclist.debug = true 
mainCyclist.setCollider("rectangle",0,0,700,650);
  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  

restart = createSprite(650,220);
restart.addImage(restartImg);
restart.scale = 0.05;
restart.visible = false; 
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
peelg = new Group();
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist.collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,4));
  
  if (World.frameCount % 55 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else if (select_oppPlayer == 3 ) {
      bananapeels();
    } else {
      redCyclists();
    }
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }
    if(peelg.isTouching(mainCyclist)){
      gameState = END;
      peel.velocityY = 0;
      peel.addAnimation("opponentPlayer3",peelImg);
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true
    //Add code to show restart game instrution in text here
    if(mousePressedOver(restart)) {
      reset();
    }

    text("Good job you covered " +distance ,550,80)
    text("Restart and beat your score" , 550,100)
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
   mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);

    peelg.setVelocityXEach(0);
    peelg.setLifetimeEach(-1);
    //write condition for calling reset( )
    if(mousePressedOver(restart)) {
        reset();
      }
    }

   }

//create reset function here
function reset(){
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
        gameState = PLAY
        gameOver.visible = false
        restart.visible = false; 
        distance = 0
        pinkCG.destroyEach()
        yellowCG.destroyEach()
        redCG.destroyEach()
        peelg.destroyEach()
}

function bananapeels(){
  peel =createSprite(1100,Math.round(random(50, 300)));
  peel.scale =0.06;
  peel.velocityX = -(6 + 2*distance/150);
  peel.addAnimation("opponentPlayer1",peelImg);
  peel.setLifetime=170;
  peel.scale = 0.15
  peelg.add(peel);
}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 300)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 300)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 300)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}