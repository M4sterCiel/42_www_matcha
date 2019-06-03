var express = require('express');
var router = express.Router();

router.post('/users/login', require('../controllers/userController'));

module.exports = router;