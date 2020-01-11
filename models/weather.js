const express = require('express');
const unirest = require("unirest");
const app = express();
const req = unirest("GET", "https://dark-sky.p.rapidapi.com/33.9526,-84.5499");

req.query({
	"lang": "en",
    "units": "auto",
    "exclude": "minutely%2C hourly%2C daily%2C flags"
});

req.headers({
	"x-rapidapi-host": "dark-sky.p.rapidapi.com",
	"x-rapidapi-key": "8fcd0baf41msh43380c9a5223fd7p18e2c5jsn53d5da255ddd"
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});

app.listen(3000, () => {
    console.log('Listening on port :3000');
})