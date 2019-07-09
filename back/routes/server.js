let express       = require("express");
let app           = express();
let bodyParser    = require("body-parser");
let userRoute     = require("./userRoute");
var http          = require('http').createServer(app);
var io            = require("socket.io").listen(http);
var chatRoute     = require('./chatRoute');
var chatController        = require('../controllers/chatController');

const PORT        = 8080;

http.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});

var connections = [];
var clients = [];

/* Middlewares */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users/", userRoute.router);
app.use("/chat/", chatRoute.router);

app.get("/setup", (req, resp) => {
  require("../config/setup");
  resp.send({ message: "Database Matcha created succefully" });
});

var nsp = io
.of('/chat');

nsp.on('connection', (socket) => {

  // Get variables
  var userID      = socket.handshake.query['userID'];
  var userToken   = socket.handshake.query['token'];
  var userName    = socket.handshake.query['userName'];
  var room_id     = socket.handshake.query['room_id'];

  var clientInfo = new Object();
  clientInfo.userID = socket.handshake.query['userID'];
  clientInfo.socketID = socket.id;
  clients.push(clientInfo);
  connections.push(socket);

  socket.join(room_id);

  socket.on(room_id, data => {
   // console.log(data);
    chatController.saveMessage([data, userID, room_id]);
    socket.broadcast.emit(room_id, data);
  })

  chatController.respond(socket);

  socket.on('disconnect', () => {
    connections.splice(-1, 1);
    for( var i=0, len=clients.length; i<len; ++i ){
      var c = clients[i];

      if(c.socketID == socket.id){
          clients.splice(i,1);
          break;
      }
    }
  });
  console.log(clients);
});

/* io.on('connection', (socket) => {
  
  var clientInfo = new Object();
  clientInfo.userID = socket.handshake.query['userID'];
  clientInfo.socketID = socket.id;
  clients.push(clientInfo);

  connections.push(socket);
  //console.log(socket.handshake.query);
  console.log("%s user(s) connected", connections.length);
  //console.log(socket.id);

  socket.join('myroom');
  socket.broadcast.emit('plop', "a new user joined the room");
  socket.broadcast.emit('online', socket.handshake.query['userName'] + " joined the room");
  io.to('myroom').emit('hello', 'world');
  socket.on('hello', (data) => {
    //console.log(data);
  });
  socket.on('myroom', data => {
    console.log(data);
    socket.broadcast.emit('myroom', data);
  })
  socket.on('disconnect', () => {
    connections.splice(-1, 1);
    for( var i=0, len=clients.length; i<len; ++i ){
      var c = clients[i];

      if(c.socketID == socket.id){
          clients.splice(i,1);
          break;
      }
  }
    console.log("disconnected");
    console.log("%s user(s) connected", connections.length);
  });
  console.log(clients);
});

io.in('myroom').emit('hello', 'world');

 */
