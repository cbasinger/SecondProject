//const bcrypt = require('bcrypt');

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});



const express = require('express')
const passport = require('passport')
const Sequelize = require('sequelize')
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const unirest = require('unirest');
const newsAPI = require('newsapi');
const req1 = unirest("GET", "https://newsapi.org/v2/top-headlines?country=us&apiKey=e495cac945ea4f628edffaeabbb972db");
const req2 = unirest("GET", "https://dark-sky.p.rapidapi.com/33.9526,-84.5499");

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];

let sequelize;
if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL);
} else if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const app = express();

app.use(cookieParser())
//app.use(session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use( express.static( "public" ) );

///////
const TodoModel = require('./models/todo')
const GroceryModel = require('./models/grocery')

const Todo = TodoModel(sequelize, Sequelize);
const Grocery = GroceryModel(sequelize, Sequelize);
////////

app.get('/', function(req, res) {
    res.render('index');
});

// GET /api/todo
app.get('/api/todos', function(req, res){
    Todo.findAll().then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    });      
});

// GET /api/grocery
app.get('/api/grocery', function(req, res){
    Grocery.findAll().then((results) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    });      
});

//POST /api/todo
app.post('/api/todo', function (req, res) {
    let data = {
        todoitem: req.body.todoitem
    };
    Todo.create(data).then(function (results) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    })
	.catch((e) => {
        console.error(e);
    });
});

app.post('/api/grocery', function (req, res) {
    let data = {
        groceryitem: req.body.groceryitem
    };
    Grocery.create(data).then(function (results) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    })
	.catch((e) => {
        console.error(e);
    });
});

app.delete('/api/todo/:id', function (req, res) {
    let id = req.params.id;
    Todo.destroy({
        where: {
            id: id
        }
    }).then(function (results) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
        console.log(results);
    })
	.catch((e) => {
        console.error(e);
    });
});
  
app.delete('/api/grocery/:id', function (req, res) {
    let id = req.params.id;
    Grocery.destroy({
        where: {
            id: id
        }
    }).then(function (results) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    })
	.catch((e) => {
        console.error(e);    })
    });

app.listen(process.env.PORT || 3000, function(){
    console.log('Posts API is now listening on Port 3000');
});

//NEWS
req1.query({
    language: 'en',
    country: 'us'
});
function getNews() {
    req1.end(function (res) {
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

//WEATHER
req2.query({
	"lang": "en",
    "units": "auto",
    "exclude": "minutely%2C hourly%2C daily%2C flags"
});
req.headers({
	"x-rapidapi-host": "dark-sky.p.rapidapi.com",
	"x-rapidapi-key": "8fcd0baf41msh43380c9a5223fd7p18e2c5jsn53d5da255ddd"
});



function getWeather(){
req2.end(function (res) {
	const weatherObject = {};
	weatherObject.name = "Local Weather";
	weatherObject.currently = res.body.currently.summary;
	weatherObject.temp = res.body.currently.temperature;
	weatherObject.wind = res.body.currently.windSpeed;
	weatherObject.alerts = res.body.alerts;

	Weather.push(weatherObject);

	
    weatherCard.appendChild(Weather);
});
};
getWeather();