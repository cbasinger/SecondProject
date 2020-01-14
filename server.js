//const bcrypt = require('bcrypt');
const express = require('express')
const passport = require('passport')
const Sequelize = require('sequelize')
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

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





// app.destroy('/api/todo', function (req, res) {
//     where: {
//       status: 'inactive'
//     }
//   });
//   // DELETE FROM post WHERE status = 'inactive';
  
app.listen(process.env.PORT || 3000, function(){
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

