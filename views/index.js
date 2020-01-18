var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
console.log('a user connected');
});

http.listen(3000, function(){
console.log('listening on *:3000');
});

io.on('connection', function(socket){
socket.on('chat message', function(msg){
console.log('message: ' + msg);
});
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

io.on('connection', function(socket){
socket.broadcast.emit('hi');
});

io.on('connection', function(socket){
socket.on('chat message', function(msg){
io.emit('chat message', msg);
});
});