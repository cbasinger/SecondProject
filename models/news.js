const NewsAPI = require('newsapi');
const unirest = require('unirest');
const newsapi = new NewsAPI('e495cac945ea4f628edffaeabbb972db');
const req = unirest("GET", "https://newsapi.org/v2/top-headlines?country=us&apiKey=e495cac945ea4f628edffaeabbb972db")

// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
req.query({
    source: 'cnn',
    language: 'en',
    country: 'us'
});

req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});