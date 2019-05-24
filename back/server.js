let express = require('express');
let app = express();
var conn = require('./config/database');

const PORT = 8080;
var glob;

app.get('/', (req, resp) => {
    resp.send("It's working for now...");
});
app.get('/plop', (req, resp) => {
    resp.send("Welcome to plop");
});


app.listen(PORT, () => {console.log("Listening on port: ", PORT)});