const router = require('express').Router();

const { signup, getbill } = require('../controller/appController.js');

// add controllers

router.post('/user/signup', signup);
router.post('/product/getbill', getbill);


module.exports = router;
