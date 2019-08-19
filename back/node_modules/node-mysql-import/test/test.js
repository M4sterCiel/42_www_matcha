const MySQLImporter = require('../lib/index.js');


// setup
var test = new MySQLImporter('localhost', 3306, 'root', 'password', 'database', 'test.sql');

test.init()
    .then(test.dropDatabaseIfExists)
    .then(test.createDatabaseIfDoesNotExist)
    .then(test.execute)
    .then(function(success){
        console.log('success');
        console.dir(success);
    })
    .catch(error => {
        console.log('error');
        console.dir(error);
    })