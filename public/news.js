const app = express();
const req = unirest("GET", "https://newsapi.org/v2/top-headlines?country=us&apiKey=e495cac945ea4f628edffaeabbb972db");
const News = [];
const newsCard = document.getElementById('news-card-body'); 
req.query({
    language: 'en',
    country: 'us'
});

function getNews() {
req.end(function (res) {
    const newsObject = {};
    newsObject.name = "Top Headlines";
    newsObject.title = res.body.articles[0].title;
    newsObject.source = res.body.articles[0].source;
    newsObject.description = res.body.articles[0].description;
    newsObject.content = res.body.articles[0].content;
    newsObject.date = res.body.articles[0].publishedAt;

    News.push(newsObject);
    newsCard.appendChild(News);
});
};
getNews();



    

