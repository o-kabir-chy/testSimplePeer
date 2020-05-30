var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var lib =require('./lib/serverlib');

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html');
});
app.get('/simple-peer', (req, res) => {
  res.sendFile(__dirname + '/node_modules/simple-peer/simplepeer.min.js');
});
app.get('/lib', (req, res) => {
  res.sendFile(__dirname + '/lib/mylib.js');
});
app.get('/test', (req, res) => {
  res.sendFile(__dirname + '/test1.html');
});
io.on('connection',socket=>{
  socket.broadcast.emit("hi");
    console.log('a user connected');
  socket.on('offer',data=>{
    var offer=JSON.parse(data);
    console.log(offer);
     socket.emit('offer',data);
  });
  // var userManager=  lib.UserManager();
  // var signalingService=lib.SignalingService(userManager,io);
  socket.on('answer',data=>{
    var answer=JSON.parse(data);
    console.log(answer);
    socket.emit('answer',data);
  });
  socket.on('m',data=>{
    console.log(data);
  });
});
http.listen(3010, () => {
  console.log('listening on *:3010');
});
