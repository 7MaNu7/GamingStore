var express = require('express');
var secret = 'Basic dXN1YXJpbzoxMjM0NTY=';

exports.checkAuth = function(pet, res, next)
{
	var auth = pet.get('Authorization');

	if(auth==null)
	{
		res.status(401);
		res.set('WWW-Authenticate', 'Basic realm="myrealm"');
		return res.send("Tenemos 401");
	}

	if(auth!=secret)
	{
		res.status(403);
		return res.send("Tenemos 403");
	}
	
	next();
	//return res.send(new Buffer(auth.replace('Basic ', ''), 'base64').toString('ascii'));
}
