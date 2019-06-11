let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let userRoute = require("./userRoute");
const PORT = 8080;

/* Middlewares */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users/", userRoute.router);

app.get("/setup", (req, resp) => {
  require("../config/setup");
  resp.send({ message: "Database Matcha created succefully" });
});

app.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});
