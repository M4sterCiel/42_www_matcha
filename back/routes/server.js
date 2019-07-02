let express       = require("express");
let app           = express();
let bodyParser    = require("body-parser");
let userRoute     = require("./userRoute");
var http          = require('http').createServer(app);
var io            = require("socket.io").listen(http);

const PORT        = 8080;

http.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});

var connections = [];
/* Middlewares */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users/", userRoute.router);

app.get("/setup", (req, resp) => {
  require("../config/setup");
  resp.send({ message: "Database Matcha created succefully" });
});

io.on('connection', (socket) => {
  connections.push(socket);
  console.log("%s user(s) connected", connections.length);
  console.log(socket.id);

  socket.join('myroom');
  socket.emit('plop', "a new user joined the room");
  io.to('myroom').emit('hello', 'world');
  socket.on('disconnect', () => {
    connections.splice(-1, 1);
    console.log("disconnected");
    console.log("%s user(s) connected", connections.length);
  });
});

io.in('myroom').emit('hello', 'world');

