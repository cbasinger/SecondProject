const News = [];
const newsCard = document.getElementById('news-card-body');
/* const axios = require('axios');  */

const newsCard1 = document.getElementById('newsCard');  
const getNews = function(){
    axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=e495cac945ea4f628edffaeabbb972db`)
    
    .then((response)=>{
    const newsObject = {};
    newsObject.name = "Top Headlines";
    newsObject.title = response.data.articles[0].title;
    newsObject.source = response.data.articles[0].source.name;
    newsObject.description = response.data.articles[0].description;
    newsObject.content = response.data.articles[0].content;
    newsObject.date = response.data.articles[0].publishedAt;
    newsCard.innerHTML = "Title: " + newsObject.title + "Source: " + newsObject.source + " " + newsObject.content;
    console.log(newsObject);
    })
};
getNews();


