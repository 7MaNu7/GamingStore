var models  = require('../models');
var express = require('express');
var cool = require('cool-ascii-faces');
var router  = express.Router();

router.get('/', function(pet, res){
	res.send("Hola soy express");
});

router.get('/cool', function(request, response) {
  response.send(cool());
});

module.exports = router;