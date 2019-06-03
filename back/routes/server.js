let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let conn = require('../config/database');
//let userRoute = require('./users');
const PORT = 8080;

/* Middlewares */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/users', require('./userRoute'));
/* Gestion d'erreurs */
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

/* app.post('/users/login', (req, res) => {
    console.log(req.body);
    if (req.body.login == 'ralleman')
        res.send({ id: "1234567890", status: "success"});
    else
        res.send({ id: "", status: "error"});
}); */

/* app.get('/setup', (req, resp) => {
    require("../config/setup");
    resp.send({ message:'Database Matcha created succefully' });
})

app.get('/user', (req, resp) => {
    resp.send({ express: "React and express are working together..." });
    console.log("running login get/login page");
});

app.post('/login', (req, resp) => {
    console.log(req.body);
    resp.send({ status: "ok"});
});

app.get('/register', (req, resp) => {
    resp.send({express: "ahah fais voir ta tete!"});
});

app.post('/register', (req, resp) => {
    console.log(req.body);
    resp.send({state: "success", obj: "lastname"});
}); */


app.listen(PORT, () => {console.log("Listening on port: ", PORT)});