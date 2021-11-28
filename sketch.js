var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost=createSprite(200,200)
  ghost.addImage(ghostImg)
  ghost.scale=0.4
  ghost.debug=true
  //ghost.setCollider("rectangle",0,0,50,50)
  doorsGroup=new Group()
  climbersGroup=new Group()
  invisibleBlockGroup=new Group()
}

function draw() {
  background(200);
  if(gameState==="play"){

  if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("left_arrow")){
      ghost.x-=3
    }
    if(keyDown("right_arrow")){
      ghost.x+=3
    }
    if(keyDown("space")){
      ghost.velocityY=-8
    }
    ghost.velocityY+=0.5
    if (invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
      ghost.destroy()
      gameState="end"
    }
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0
    }
    spawnObjects()
    drawSprites()
}
else if(gameState==="end"){
textSize(30)
text("gameOver",250,250)
}
}
function spawnObjects(){
  if(frameCount%300===0){
    var door= createSprite(200,-50)
    door.addImage(doorImg)
    door.velocityY=1
    door.x=Math.round(random(120,400))
    door.lifetime=800
    doorsGroup.add(door)
    var climber=createSprite(200,10)
    climber.addImage(climberImg)
    climber.x=door.x
    climber.velocityY=1
    climber.lifetime=800
    climbersGroup.add(climber)
    var invisibleBlock=createSprite(door.x,15,climber.width,2)
    invisibleBlock.velocityY=1
    //invisibleBlock.visible=false
    invisibleBlockGroup.add(invisibleBlock)
    invisibleBlock.lifetime=800
    door.depth=ghost.depth
    ghost.depth++
  }
}
