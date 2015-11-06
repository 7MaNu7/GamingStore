var models  = require('../models');
var express = require('express');
var router  = express.Router();
var checkAuth = require('./checkAuth');

router.get('/', checkAuth.checkAuth, function(pet, resp){
	models.Usuario.findAll().then(function(results){
		resp.send(results);
	});
})

router.post('/', function(pet, resp){

	if(pet.body.email=="" || pet.body.email==null)
	{
		resp.status(400).send("Error 400: Se debe especificar un email");
		resp.end();
	}
	else
	{

		models.Usuario.findOne({
			where: {
				email: pet.body.email
			}
		}).then(function(user){

			if(user!=null && user!=undefined)
			{			
				resp.status(400).send("Error 400: El email proporcionado ya existe, escoja otro por favor");
				resp.end();
			}
			else
			{
				models.Usuario.create({
					email: pet.body.email,
					nombre: pet.body.nombre,
					apellidos: pet.body.apellidos,
					direccion: pet.body.direccion
				}).then(function(usuario){
					resp.location('/api/usuarios/' + usuario.id)
					resp.status(201).send();
				});
			}
		});
	}
});

router.put('/:id', checkAuth.checkAuth, function(pet, resp){


	if(!isNaN(pet.params.id))
	{
		var values = {nombre: pet.body.nombre, apellidos: pet.body.apellidos, direccion: pet.body.direccion};
		var index = { where: {id: pet.params.id} };

		models.Usuario.update(values, index).then(function(result){

			if(result==false)
			{
				resp.status(404).send("Error 404: El usuario que intenta modificar no existe");
			}
			else
			{
				resp.status(204).send("Usuario modificado correctamente");
			}
		});
	}
	else
	{
		resp.status(400).send("Error 400: El id proporcionado no es un numero");
	}
});

router.delete('/:id', checkAuth.checkAuth, function(pet, resp){

	if(!isNaN(pet.params.id))
	{
		var index = { where: {id: pet.params.id} };

		models.Usuario.destroy(index).then(function(result){

			if(result==false)
			{
				resp.status(404).send("Error 404: El usuario que intenta borrar no existe");
			}
			else
			{
				resp.status(204).send("Usuario eliminado correctamente");
			}
		});
	}
	else
	{
		resp.status(400).send("Error 400: El id proporcionado no es un numero");
	}

})

router.get('/:id', checkAuth.checkAuth, function(pet, resp){

	if(!isNaN(pet.params.id))
	{
		models.Usuario.findById(pet.params.id).then(function(result){

			if(result==null)
			{			
				resp.status(404).send("Error 404: El usuario al que intenta acceder no existe");
			}
			else
			{		
				resp.status(200).send(result);
			}
		});
	}
	else
	{
		resp.status(400).send("Error 400: El id proporcionado no es un numero");
	}
})

//metodo para añadir un juego al historial de compras de un usuario (conociendo Ids -> put)
router.put('/:id/juegos/:juegoId', checkAuth.checkAuth, function(pet, resp){

	if(!isNaN(pet.params.id) && !isNaN(pet.params.juegoId))
	{
		models.Usuario.findById(pet.params.id).then(function(user){

			if(user==null)
			{
				resp.status(404).send("Error 404: El usuario con id "+pet.params.id+" no existe");
			}
			else
			{
				models.Juego.findById(pet.params.juegoId).then(function(game){

					if(game==null)
					{
						resp.status(404).send("Error 404: El juego con id "+pet.params.juegoId+" no existe");
					}
					else
					{
						user.addJuego(game)
						resp.status(204).send();
					}
				});
			}
		});
	}
	else
	{
		resp.status(400).send("Error 400: Los id proporcionados deben ser numericos");
	}

})

//obtencion historial de compras
router.get('/:id/juegos', checkAuth.checkAuth, function(pet, resp){

	if(!isNaN(pet.params.id))
	{
		models.Usuario.findById(pet.params.id).then(function(user){

			if(user==null)
			{			
				resp.status(404).send("Error 404: El usuario al que intenta acceder no existe");
			}
			else
			{		
				user.getJuegos().then(function(results){
					resp.status(200).send(results)
				});
			}
		});
	}
	else
	{
		resp.status(400).send("Error 400: El id proporcionado no es un numero");
	}
})

module.exports = router;