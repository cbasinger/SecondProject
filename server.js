//const bcrypt = require('bcrypt');
const express = require('express')
const passport = require('passport')
const Sequelize = require('sequelize')
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const config = {
	host: 'localhost',
	port: 3000,
	database: 'before-you-leave',
	username: 'postgres',
	password: '$1lagoat'
 };

const sequelize = new Sequelize('before-you-leave', 'postgres', '', {
    host: 'localhost',
    dialect: 'postgres',
    password: '$1lagoat',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
})


var app = express();

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
        console.log(req.body);
        console.log(data);
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

app.listen(3000, function(){
    console.log('Posts API is now listening on Port 3000');
});


    
//const bodyParser = require('body-parser');
// const pgp = require('pg-promise')();
// const db = pgp(process.env.DATABASE_URL || config);
// var cors = require('cors')


/////////////////////
//const PostsModel = require('./models/posts')


// const connectionString = `postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`
// 



///// Models
//const Comments = CommentsModel(sequelize, Sequelize);

//Joins
//Users.hasMany(Posts, {foreignKey: 'user_id'})

