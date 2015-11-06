var models  = require('../models');
var express = require('express');
var router  = express.Router();
var checkAuth = require('./checkAuth');

router.get('/', function(pet, resp){
	models.Consola.findAll().then(function(results){
		resp.send(results);
	});
})

router.post('/', checkAuth.checkAuth, function(pet, resp){

		models.Consola.create({
			nombre: pet.body.nombre,
			descripcion: pet.body.descripcion,
		}).then(function(consola){
			resp.location('/api/consolas/' + consola.id)
			resp.status(201).send();
		});
});

router.put('/:id', checkAuth.checkAuth, function(pet, resp){


	if(!isNaN(pet.params.id))
	{
		var values = {nombre: pet.body.nombre, descripcion: pet.body.descripcion};
		var index = { where: {id: pet.params.id} };

		models.Consola.update(values, index).then(function(result){

			if(result==false)
			{
				resp.status(404).send("Error 404: El producto que intenta modificar no existe");
			}
			else
			{
				resp.status(204).send("Producto modificado correctamente");
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

		models.Consola.destroy(index).then(function(result){

			if(result==false)
			{
				resp.status(404).send("Error 404: El producto que intenta borrar no existe");
			}
			else
			{
				resp.status(204).send("Producto eliminado correctamente");
			}
		});
	}
	else
	{
		resp.status(400).send("Error 400: El id proporcionado no es un numero");
	}

})

router.get('/:id', function(pet, resp){

	if(!isNaN(pet.params.id))
	{
		models.Consola.findById(pet.params.id).then(function(result){

			if(result==null)
			{			
				resp.status(404).send("Error 404: El producto al que intenta acceder no existe");
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

//Devuelve todos los productos de una categoria
router.get('/:id/juegos', function(pet, resp){

	if(!isNaN(pet.params.id))
	{
		models.Consola.findById(pet.params.id).then(function(cat){

			if(cat==null)
			{			
				resp.status(404).send("Error 404: El producto al que intenta acceder no existe");
			}
			else
			{
				return cat.getJuegos();
			}

		}).then(function(result){
			resp.status(200).send(result);
		});
	}
	else
	{
		resp.status(400).send("Error 400: El id proporcionado no es un numero");
	}
});

module.exports = router;