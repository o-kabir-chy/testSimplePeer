const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
var userManager = require('./slib/UserManager');
var signalingService = require('./slib/SignalingService');

app.use(express.static('src'));
app.use(express.static('slib'));
app.use(express.static('lib'));

// app.get('/', (req, res) => {
//    res.sendFile(__dirname + '/index.html');
// });
app.get('/simple-peer', (req, res) => {
  res.sendFile(__dirname + '/node_modules/simple-peer/simplepeer.min.js');
});
app.get('/requirejs', (req, res) => {
  res.sendFile(__dirname + '/node_modules/requirejs/require.js');
});
// app.get('/ui', (req, res) => {
//   res.sendFile(__dirname + '/lib/uiService.js');
// });
// app.get('/app.js', (req, res) => {
//   res.sendFile(__dirname + '/app.js');
// });
// app.get('/test', (req, res) => { 
//   res.sendFile(__dirname + '/test1.html');
// });
// app.get('/test2', (req, res) => {
//   res.sendFile(__dirname + '/test2.html');
// });

//app.get()
io.on('connection', socket => {
  socket.broadcast.emit("hi");
  console.log('a user connected');
  socket.on('offer', data => {
    var offer = JSON.parse(data);
    console.log(offer);
    socket.emit('offer', data);
  });
  // var userManager=userManager();
  // var ss=new signalingService(userManager,io);
  socket.on('answer', data => {
    var answer = JSON.parse(data);
    console.log(answer);
    socket.emit('answer', data);
  });
  socket.on('m', data => {
    console.log(data);
  });
});
http.listen(3010, () => {
  console.log('listening on *:3010');
});
