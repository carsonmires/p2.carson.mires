let img;
let curr_weather;
let curr_short_forecast;
let week_forecast;
let csv_news;
let csv_weight;
let csv_calendar;

function preload(){

  img = loadImage('mirror pic.jpeg');
  csv_news = loadTable('News - Sheet1.csv', 'csv');
  csv_weight = loadTable('Weight - Sheet1.csv', 'csv');
  csv_calendar = loadTable('Calendar - Sheet1.csv', 'csv');

}

function setup() {
  createCanvas(1000, 1000);
  get_weather();
  get_forecast();
}

function draw() {
  background(255);

  //Mirror Pic
  display();

  //WEATHER
  fill(232,132,137);
  rect(30,360,150,100,20);
  circle(67,378,5)
  textSize(24);
  fill(0)
  textAlign(LEFT,CENTER)
  text(curr_weather,35,385);
  textSize(10)
  fill(0)
  textAlign(LEFT,CENTER)
  text(curr_short_forecast,80,385);
  textSize(14)
  fill(0)
  textStyle(BOLD)
  textAlign(CENTER, CENTER)
  text("Tonight",60, 407 )
  textStyle(NORMAL)
  textSize(10)
  fill(0)
  textAlign(LEFT,CENTER)
  text(week_forecast,40,422, 130, 30);
  
  textStyle(BOLD)
  textSize(14)
  textAlign(LEFT, CENTER)
  text("Lubbock, TX",80,370)
  textStyle(NORMAL)

  //CLOCK
  fill(154,209,227)
  circle(75,70,125)

  

  var sec = second();
  var min = minute();
  var hours = hour();
  var mer = hours < 12 ? "AM" : "PM";

  sec = formatting(sec);
  min = formatting(min);
  hours = formatting(hours % 12);
  fill(0);
  textStyle(BOLD)
  textSize(18);
  textAlign(CENTER, CENTER);
  text(hours + ":" + min + ":" + sec + " " + mer, 76, 70);


  //NEWS

  fill(36,35,35)
  rect(180, 450, 300, 20, 5)


  fill(255)
  textSize(8)
  if(csv_news){

    text("NEWS", 330, 445)
    let content = csv_news.getString(0,0) + " ,  "  + csv_news.getString(0,1);
    
    text(content, 330, 460)
    
  }


  //WEIGHT
  fill(200,237,187);
  circle(550,400,125);
  fill(36,35,35);
  circle(550,425,65)
  fill(0);
  textStyle(BOLD);
  textSize(18)
  textAlign(CENTER, CENTER);
  text("Weight", 548, 375);

  textStyle(NORMAL);

  if(csv_weight){
    let weightContent = csv_weight.getString(0,0);
    fill(255)
    textSize(24)
    text(weightContent, 548, 425)
    textSize(10)
    text("lbs", 548, 440)
  }


  //CALENDAR

  fill(232, 235, 183)
  rect(500, 10, 130, 200, 20)

  fill(0)
  textStyle(BOLD)
  textSize(18)
  textAlign(CENTER, CENTER)
  text("Calendar", 563, 30)

  
  line(500, 50, 630, 50)
  line(500, 90, 630, 90)
  line(500, 130, 630, 130)
  line(500, 170, 630, 170)

  if(csv_calendar){
      let event1 = csv_calendar.getString(0,0) + " - " + csv_calendar.getString(0,1);
      let event2 = csv_calendar.getString(1,0) + " - " + csv_calendar.getString(1,1);
      let event3 = csv_calendar.getString(2,0) + " - " + csv_calendar.getString(2,1);
      let event4 = csv_calendar.getString(3,0) + " - " + csv_calendar.getString(3,1);

      textStyle(NORMAL)
      textSize(12)
      textAlign(CENTER, CENTER)
      text(event1, 500, 52, 130, 40)
      text(event2, 500, 92, 130, 40)
      text(event3, 500, 132, 130, 40)
      text(event4, 500, 172, 130, 40)
  }
  

  
}

function display(){

  image(img, 0, 0);
  
}

function formatting(num){
  if(int(num) < 10){
    return "0" + num;
  }
  return num;
}




async function get_weather(){
  const response = await fetch('https://api.weather.gov/gridpoints/LUB/48,32/forecast/hourly');
  const json = await response.json();
  console.log(json)
  curr_weather = json.properties.periods[0].temperature
  curr_short_forecast = json.properties.periods[0].shortForecast
}

async function get_forecast(){
  const response = await fetch('https://api.weather.gov/gridpoints/LUB/48,32/forecast');
  const json = await response.json();
  console.log(json)
  week_forecast = json.properties.periods[1].detailedForecast
}


