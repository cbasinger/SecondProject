/* const axios = require("axios");  */
const Weather = [];
const weatherCard = document.getElementById('weather-body');

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
		/* weatherObject.summary = response.data.currently.summary ; */
		weatherObject.temperature = response.data.currently.temperature;
		/* weatherCard.id= "card-body"; */
		weatherCard.innerHTML= weatherObject.name + " Currently: " + weatherObject.icon + " Temperature: " + weatherObject.temperature; 
		console.log(weatherObject);
  })
		.catch((error)=>{
		console.log(error)
		  })
	};
getWeather()

	
