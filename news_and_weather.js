const express = require('express');
const WeatherModel = require('./models/weather');
const NewsModel = require('./models/news');
/* const newsCard = document.getElementById("NewsCard");
const weatherCard = document.getElementById(); */

const app = express()


const getWeather = function(){
    app.post(WeatherModel, function(req, res){
        let data = {
            currently: req.body.currently,
            alerts: req.body.alerts
        };
    console.log(data);
    
    })
}