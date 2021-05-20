//Create variables here
var dog, happyDog, database, foodS, foodStock;
var obj;
var fedTime, lastFed, foodObj;
var feed, addFood;
var milk;

function preload()
{
	//load images here
  dog      = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  milkBottle = loadImage("images/Milk.png");
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  foodStock.set(20 )

  dogObj = createSprite(800,200,10,10);
  dogObj.addImage(dog);
  dogObj.scale = 0.15;

  milk = createSprite(200,200,10,10);
  milk.visibility = false;
  milk.scale = 0.1;
  
  foodObj = new Food;

  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);


  
}


function draw() {  
  background(46, 139, 87)

    //textSize(20);
    //fill(255);
    //text("Food left: "+ foodS,180,100);

    fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
       lastFed = data.val();
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("last Feed : "+ lastFed%12 +"PM",350,30);
  }else if(lastFed == 0){
    text("last Feed : 12 AM", 350,30);
  }else{
    text("last Feed : "+ lastFed +"AM",350,30);
  }

  if(milk.x > 720){
    milk.velocityX = 0;
    dogObj.addImage(happyDog);
    text("I ENJOY DA MILK...",720,150)
  }else(
    dogObj.addImage(dog)
  );
 
  foodObj.display();
  dogObj.display();
  milk.display();
  
  //add styles here

}

function readStock(data){

  foodS = data.val();
  foodObj.updateFoodStock(foodS);

}

function writeStock(x){
  
  if(x<0){
    x = 0;
  }else{
    x = x - 1;
  }

  database.ref('/').update({
    Food : x
  })

}

function addFoods(){
foodS++
database.ref('/').update({
  Food:foodS
})
}

function feedDog(){

  milk.addImage(milkBottle);
  milk.velocityX = 5;
  milk.x = 200;

  console.log("data",foodObj.getFoodStock())
  
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  console.log("data after update",foodObj.getFoodStock())
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })

}








