let express = require('express');
let app = express();
let bodyParser = require('body-parser');
var conn = require('./config/database');

const PORT = 8080;
var glob;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/setup', (req, resp) => {
    require("./config/setup");
    resp.send({ message:'Database Matcha created succefully' });
})
app.get('/', (req, resp) => {
    resp.send({ express: "It's working for now..." });
});
app.get('/plop', (req, resp) => {
    resp.send("Welcome to plop");
});


app.listen(PORT, () => {console.log("Listening on port: ", PORT)});