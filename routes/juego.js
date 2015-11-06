var models  = require('../models');
var express = require('express');
var router  = express.Router();
var checkAuth = require('./checkAuth');

var paginado = require('./paginado');

var articulosPorPag = 2;

router.get('/', function(pet, resp){

	if(pet.query.page==undefined && pet.url!='/')
	{
		return resp.status(400).send("Falta el parametro page").end();
	}

	models.Juego.findAll({
		//el elemento por el que empezamos
		offset: ((pet.query.page-1)*articulosPorPag),
		limit: articulosPorPag
	}).then(function(results){
		models.Juego.count().then(function(cantidad){
			var url = "http://localhost:3000/api/juegos";

			paginado.comprobarPaginado(url, pet, cantidad, articulosPorPag);

			if(paginado.error()==true)
			{
				return resp.status(404).send("Recurso no encontrado").end();
			}
			else
			{

				var self = paginado.self();
				var prev = paginado.prev();
				var next = paginado.next();
				var last = paginado.last();

				resp.status(200).send({
					_links: {
						self: {
							href: self
						},
						first: {
							href: url
						},
						prev: {
							href: prev
						},
						next: {
							href: next
						},
						last: {
							href: last
						}
					},
					count: results.length,
					total: cantidad,
					data: results
				});
			}
		});
	});
})

router.post('/', checkAuth.checkAuth, function(pet, resp){

	if(pet.body.ConsolaId==null || pet.body.ConsolaId=="")
	{
		resp.status(400).send("Error 400: Un producto debe tener una consola asociada (ConsolaId)")
	}
	else if(isNaN(pet.body.ConsolaId))
	{
		resp.status(400).send("El id de la consola no es numerico")
	}
	else
	{

		models.Juego.findById(pet.body.ConsolaId).then(function(cat){

			if(cat==null)
			{			
				resp.status(404).send("Error 404: La consola que intenta asignar no existe");
			}
			else
			{
					models.Juego.create({
						nombre: pet.body.nombre,
						descripcion: pet.body.descripcion,
						genero: pet.body.genero,
						ConsolaId: pet.body.ConsolaId
					}).then(function(juego){
						resp.location('/api/juegos/' + juego.id)
						resp.status(201).send();
					});
			}

		});
	}
});

router.put('/:id', checkAuth.checkAuth, function(pet, resp){


	if(!isNaN(pet.params.id))
	{
//		console.log(pet.body);
		var values = {nombre: pet.body.nombre, descripcion: pet.body.descripcion, genero: pet.body.genero};
		var index = { where: {id: pet.params.id} };

		models.Juego.update(values, index).then(function(result){

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

		models.Juego.destroy(index).then(function(result){

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
		models.Juego.findById(pet.params.id).then(function(result){

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

module.exports = router;