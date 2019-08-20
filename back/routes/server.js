let app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io").listen(http);
let bodyParser = require("body-parser");
let userRoute = require("./userRoute");
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

var mainSocket = io.on("connection", async socket => {
  await onlineTab.push({
    userID: socket.handshake.query["userID"],
    socketID: socket.id
  });

  chatController.onlineStatus(socket.handshake.query["userID"]);
  console.log("%d socket(s) online", onlineTab.length);
  console.log({ onlineTab });

  socket.broadcast.emit("online", {
    user_id: socket.handshake.query["userID"],
    status: "Online"
  });

  socket.on('sendNotif', (type, username) => {
    console.log(type, username);
  })

  socket.on("disconnect", reason => {
    //console.log(reason);
    for (var i = 0; i < onlineTab.length; i++) {
      if (onlineTab[i]["socketID"] == socket.id) onlineTab.splice(i, 1);
    }
    var result = onlineTab.find(
      elem => elem.userID === socket.handshake.query["userID"]
    );
    if (result === undefined) {
      socket.broadcast.emit("offline", {
        user_id: socket.handshake.query["userID"],
        status: "Offline"
      });
      chatController.offlineStatus(socket.handshake.query["userID"]);
      console.log("%d socket(s) online", onlineTab.length);
      console.log({ onlineTab });
    }
  });
});
var nsp = io.of("/chat");

nsp.on("connection", socket => {
  // Get variables
  var userID = socket.handshake.query["userID"];
  var userToken = socket.handshake.query["token"];
  var userName = socket.handshake.query["userName"];
  var room_id = socket.handshake.query["room_id"];

  socket.join(room_id);

  socket.on(room_id, (data, userID_other) => {
    chatController.saveMessage([data, userID, room_id]);
    chatController.saveNotification(
      userID_other,
      userID,
      "message",
      "",
      room_id
    );
    socket.broadcast.emit(room_id, { data, userID, userName });
    mainSocket.emit("new message", { room_id, userID_other });
  });

  socket.on("readMessage", data => {
    chatController.readMessage(data, userID);
    mainSocket.emit("readMessage", userID, data);
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
});
