/* const axios = require("axios"); */   
const Weather = [];
const weatherCard = document.getElementById('weatherCard');

const getWeather = function(){
	axios({
		"method":"GET",
		"url":"https://dark-sky.p.rapidapi.com/33.7490,-84.3880",
		"headers":{
		"content-type":"application/octet-stream",
		"x-rapidapi-host":"dark-sky.p.rapidapi.com",
		"x-rapidapi-key":"7fe1b1a801msh0ac2cb4e3546c80p1529fcjsn2a7168032f32"
		},"params":{
		"lang":"en",
		"units":"auto",
		"exclude":"minutely%2C hourly%2C daily%2C flags"
		}
		})
		.then((response) => {
		const weatherObject = {};
		weatherObject.name = "Local Weather for Atlanta, Georgia";
		weatherObject.icon = response.data.currently.icon ;
		weatherObject.summary = response.data.currently.summary ;
		weatherObject.temperature = response.data.currently.temperature;
		weatherCard.id= "card-body";
		weatherCard.innerHTML= weatherObject; 
		console.log(weatherObject);
  })
		.catch((error)=>{
		console.log(error)
		  })
	};
getWeather()

	
/* const unirest = require('unirest');
const express = require('express');
const app = express();
const req2 = unirest("GET", "https://dark-sky.p.rapidapi.com/33.9526,-84.5499");
const Weather = [];
const weatherCard = document.getElementById('weather-body');


req2.query({
	"lang": "en",
    "units": "auto",
    "exclude": "minutely%2C hourly%2C daily%2C flags"
});

req.headers({
	"x-rapidapi-host": "dark-sky.p.rapidapi.com",
	"x-rapidapi-key": "8fcd0baf41msh43380c9a5223fd7p18e2c5jsn53d5da255ddd"
});

app.get('/', function(req, res) {
    res.render('index');
});

function getWeather(){
req.end(function (res) {
	const weatherObject = {};
	weatherObject.name = "Local Weather";
	weatherObject.currently = res.body.currently.summary;
	weatherObject.temp = res.body.currently.temperature;
	weatherObject.wind = res.body.currently.windSpeed;
	weatherObject.alerts = res.body.alerts;

	Weather.push(weatherObject);

	
	weatherCard.appendChild(Weather);
	

	/* if (res.error) throw new Error(res.error); */
	

	/* console.log(res.body.currently);
	console.log(res.body.alerts); */
/* });
};
getWeather();

const createWeathercard = function (){

}
 */
/* app.listen(3000, () => {
    console.log('Listening on port :3000');
}) */ 