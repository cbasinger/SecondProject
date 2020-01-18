const NewsAPI = require('newsapi');
const unirest = require('unirest');
const newsapi = new NewsAPI('e495cac945ea4f628edffaeabbb972db');
const req = unirest("GET", "https://newsapi.org/v2/top-headlines?country=us&apiKey=e495cac945ea4f628edffaeabbb972db");
/* const newsCard = document.getElementById("NewsCard"); */
const News = [];
req.query({
    language: 'en',
    country: 'us'
});

req.end(function (res) {
    const newsObject = {};
    newsObject.name = "Top Headlines";
    newsObject.title = res.body.articles[0].title;
    newsObject.source = res.body.articles[0].source;
    newsObject.description = res.body.articles[0].description;
    newsObject.content = res.body.articles[0].content;
    newsObject.date = res.body.articles[0].publishedAt;

    News.push(newsObject);
    console.log(News);
});



/* const createNewsCard = function(){
    for (i=0; i<5; i++){
        const newsCardContainer = document.createElement("div");
        newsCardContainer.className = "card card_"+i+"_div";
        var newCard = document.createElement("div");
        newCard.className = "card";
        newCard.style = "width: 25rem;";
        var newCardBody = document.createElement("div");
        newCardBody.className = "card-body";
        var newCardTitle = document.createElement("h5");
        newCardTitle.className = "card-title";
        newCardTitle.innerHTML = articles[i].title;
    }
} */
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them


    


    /* if (res.error) throw new Error(res.error) */
    

