var router = require('express').Router();
var userController = require('../controllers/userController');

router.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
})
router.post('/login', userController.getUser);
router.post('/register', userController.createUser);


module.exports = router;