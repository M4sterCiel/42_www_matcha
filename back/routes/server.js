let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let userRoute = require("./userRoute");
var http = require("http").createServer(app);
var io = require("socket.io").listen(http);
var chatRoute = require("./chatRoute");
var chatController = require("../controllers/chatController");

/* Listenning port */

const PORT = 8080;

http.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});

/* Middlewares */

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use("/users/", userRoute.router);
app.use("/chat/", chatRoute.router);

app.get("/setup", (req, resp) => {
  require("../config/setup");
  resp.send({ message: "Database Matcha created succefully" });
});

/* Socket.io */

var connections = [];
var clients = [];
var onlineTab = [];

var online = io.on("connection", socket => {
  onlineTab.push(socket);

  console.log("%d socket(s) online", onlineTab.length);

  socket.on("disconnect", () => {
    onlineTab.splice(-1, 1);
    console.log("%d socket(s) online", onlineTab.length);
  });
});
var nsp = io.of("/chat");

nsp.on("connection", socket => {
  // Get variables
  var userID = socket.handshake.query["userID"];
  var userToken = socket.handshake.query["token"];
  var userName = socket.handshake.query["userName"];
  var room_id = socket.handshake.query["room_id"];

  var clientInfo = new Object();
  clientInfo.userID = socket.handshake.query["userID"];
  clientInfo.socketID = socket.id;
  clients.push(clientInfo);
  connections.push(socket);

  socket.join(room_id);

  socket.on(room_id, data => {
    // console.log(data);
    chatController.saveMessage([data, userID, room_id]);
    socket.broadcast.emit(room_id, { data, userID, userName });
  });

  socket.on("disconnect", () => {
    connections.splice(-1, 1);
    for (var i = 0, len = clients.length; i < len; ++i) {
      var c = clients[i];

      if (c.socketID == socket.id) {
        clients.splice(i, 1);
        break;
      }
    }
  });
  //console.log(clients);
});
