/* const axios = require("axios");   */
const Weather = [];
const weatherCard = document.getElementById('weatherCard');

const getWeather = function(){
	axios.get(`https://api.darksky.net/forecast/72ab598c45cd158cc33bd7e28c892580/33.9526,-84.5499`)
		.then((response) => {
		const weatherObject = {};
		weatherObject.name = "Local Weather";
		weatherObject.weather=response.data.currently
	
		weatherCard.className= "card-body";
		weatherCard.innerHTML= weatherObject.currently; 
		/* console.log(response); */
		})
	};
getWeather();


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