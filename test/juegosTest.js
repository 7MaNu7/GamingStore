var app = require('../app');
var supertest = require('supertest');
var assert = require('assert');

describe('Pruebas de Juegos', function () {

	it('GET /api/juegos devuelve los juegos', function (done) {
		supertest(app)
		.get('/api/juegos')
		.expect(200)
		.expect(function(result) {
			assert(result.text.indexOf('Metal Gear Solid V') != -1);
			assert(result.text.indexOf('Fifa 16') != -1);
		})
		.end(done);
	});

	it('GET /juegos/:id devuelve el juego', function (done) {
		supertest(app)
		.get('/api/juegos/1')
		.expect(200)
		.expect(function(result) {
			assert(result.text.indexOf('Metal Gear Solid V') != -1);
		})
		.end(done);
	});

	it('GET /juegos/:id juego inexistente', function(done) {
		supertest(app)
		.get('/api/juegos/309')
		.expect("Error 404: El producto al que intenta acceder no existe")
		.expect(404, done);
	});
	
	it('GET /juegos/:id el id no es numero', function(done) {
		supertest(app)
		.get('/api/juegos/ar')
		.expect("Error 400: El id proporcionado no es un numero")
		.expect(400, done);
	});

	it('POST /juegos crea el juego', function(done) {
		supertest(app)
		.post('/api/juegos')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')	
		.send("nombre=Bioshock&&descripcion=Bienvenido a Rapture&&ConsolaId=1")
		.expect(201, done);
	});

	it('POST /juegos sin ConsolaId da error 400', function(done) {
		supertest(app)
		.post('/api/juegos')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')	
		.send("nombre=Bioshock&&descripcion=Bienvenido a Rapture")
		.expect("Error 400: Un producto debe tener una consola asociada (ConsolaId)")
		.expect(400, done);
	});

	it('POST /juegos crear juego con ConsolaId no numerico', function(done) {
		supertest(app)
		.post('/api/juegos')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')	
		.send("nombre=Bioshock&&descripcion=Bienvenido a Rapture&&ConsolaId=ar")
		.expect("El id de la consola no es numerico")
		.expect(400, done);
	});

	it('POST /juegos crear juego con ConsolaId de una consola inexistente', function(done) {
		supertest(app)
		.post('/api/juegos')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')	
		.send("nombre=Bioshock&&descripcion=Bienvenido a Rapture&&ConsolaId=20")
		.expect("Error 404: La consola que intenta asignar no existe")
		.expect(404, done);
	});

	it('PUT /juegos/:id edita el juego', function(done) {
		supertest(app)
		.put('/api/juegos/1')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')	
		.send("nombre=Bioshock 2")
		.expect(204, done);
	});


	it('PUT /juegos/:id el id del juego a editar no es numerico', function(done) {
		supertest(app)
		.put('/api/juegos/ar')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')	
		.send("nombre=Bioshock&&descripcion=Bienvenido a Rapture")
		.expect("Error 400: El id proporcionado no es un numero")
		.expect(400, done);
	});

	it('PUT /juegos el id del juego a editar no esta registrado', function(done) {
		supertest(app)
		.put('/api/juegos/309')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')	
		.send("nombre=Bioshock")
		.expect("Error 404: El producto que intenta modificar no existe")
		.expect(404, done);
	});

	it('DELETE /juegos/:id elimina el juego', function (done) {
		supertest(app)
		.delete('/api/juegos/1')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')	
		.expect(204, done);
	});

	it('DELETE /juegos/:id juego inexistente', function(done) {
		supertest(app)
		.delete('/api/juegos/309')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')	
		.expect("Error 404: El producto que intenta borrar no existe")
		.expect(404, done);
	});
	
	it('DELETE /juegos/:id el id no es numero', function(done) {
		supertest(app)
		.delete('/api/juegos/ar')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')	
		.expect("Error 400: El id proporcionado no es un numero")
		.expect(400, done);
	});

});