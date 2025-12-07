const express = require('express');
const router = express.Router();
const {registerUser, loginUser} = require('../controllers/authController');


router.get('/', function(req,res){
    res.send('its working');
})

router.post('/register', registerUser);

router.post('/register', loginUser)

module.exports = router;