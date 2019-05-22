let express = require('express')();
let app = express;
let MongoClient = require('mongodb').MongoClient;

var glob;

MongoClient.connect('mongodb://localhost:27017/matcha', { useNewUrlParser: true }, function(err, db) {
  if (err) {
      console.log(err);
    }
    else {
    console.log('Connected to db Matcha');
    var matcha = db.db("matcha");
    matcha.collection('users').find().toArray(function(err, result) {
        if (err) {
            throw err;
          }
          glob = result;
          console.log(result);
    });
  }
});
app.get('/', (req, resp) => {
    resp.send(glob);
});

app.listen(8080, () => {console.log("Listening on port 8080")});