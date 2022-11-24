const express = require("express");
const https=require("https");
const bodyParser= require("body-parser")
require('dotenv').config();
const app= express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
  let query=req.body.cityName;
  const apiKey = process.env.WEATHER_API_KEY;
  const url= "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=" + apiKey+"&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData =JSON.parse(data);
      console.log(weatherData);
      const temp= weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@4x.png";
      // res.write("<h1>the weather is currently "+descp+"<h1>")
      // res.write("<h1>the temperature in "+weatherData.name+" is "+temp+" degree celcius<h1>");
      // res.write("<img src="+icon+">");
      query = query.toUpperCase();

     res.render('weather',{city : query,temperature : temp,explain : desc,image : imageURL});
      res.end();
    });
  });
});





app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log("Server is running on port.");
});
