var app = require('../app');
var supertest = require('supertest');
var assert = require('assert');

describe('Pruebas de consolas', function () {

	it('GET /api/consolas devuelve los consolas', function (done) {
		supertest(app)
		.get('/api/consolas')
		.expect(200)
		.expect(function(result) {
			assert(result.text.indexOf('Playstation 4') != -1);
			assert(result.text.indexOf('Wii U') != -1);
		})
		.end(done);
	});

	it('GET /consolas/:id devuelve el consola', function (done) {
		supertest(app)
		.get('/api/consolas/1')
		.expect(200)
		.expect(function(result) {
			assert(result.text.indexOf('Playstation 4') != -1);
		})
		.end(done);
	});

	it('GET /consolas/:id consola inexistente', function(done) {
		supertest(app)
		.get('/api/consolas/309')
		.expect("Error 404: El producto al que intenta acceder no existe")
		.expect(404, done);
	});
	
	it('GET /consolas/:id el id no es numero', function(done) {
		supertest(app)
		.get('/api/consolas/ar')
		.expect("Error 400: El id proporcionado no es un numero")
		.expect(400, done);
	});


	it('GET /api/consolas/:id/juegos devuelve los juegos', function (done) {
		supertest(app)
		.get('/api/consolas/1/juegos')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')	
		.expect(200)
		.expect(function(result) {
			assert(result.text.indexOf('Metal Gear Solid V') != -1);
			assert(result.text.indexOf('Fifa 16') != -1);
		})
		.end(done);
	});

	it('GET /consolas/:id/juegos consola inexistente', function(done) {
		supertest(app)
		.get('/api/consolas/309/juegos')
		.expect("Error 404: El producto al que intenta acceder no existe")
		.expect(404, done);
	});
	
	it('GET /consolas/:id/juegos el id no es numero', function(done) {
		supertest(app)
		.get('/api/consolas/ar/juegos')
		.expect("Error 400: El id proporcionado no es un numero")
		.expect(400, done);
	});

	it('POST /consolas crea el consola', function(done) {
		supertest(app)
		.post('/api/consolas')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')	
		.send("nombre=Bioshock&&descripcion=Bienvenido a Rapture&&ConsolaId=1")
		.expect(201, done);
	});

	it('PUT /consolas/:id edita el consola', function(done) {
		supertest(app)
		.put('/api/consolas/1')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')	
		.send("nombre=Bioshock 2")
		.expect(204, done);
	});


	it('PUT /consolas/:id el id del consola a editar no es numerico', function(done) {
		supertest(app)
		.put('/api/consolas/ar')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')	
		.send("nombre=Bioshock&&descripcion=Bienvenido a Rapture")
		.expect("Error 400: El id proporcionado no es un numero")
		.expect(400, done);
	});

	it('PUT /consolas el id del consola a editar no esta registrado', function(done) {
		supertest(app)
		.put('/api/consolas/309')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')	
		.send("nombre=Bioshock")
		.expect("Error 404: El producto que intenta modificar no existe")
		.expect(404, done);
	});

	it('DELETE /consolas/:id elimina el consola', function (done) {
		supertest(app)
		.delete('/api/consolas/1')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')	
		.expect(204, done);
	});

	it('DELETE /consolas/:id consola inexistente', function(done) {
		supertest(app)
		.delete('/api/consolas/309')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')	
		.expect("Error 404: El producto que intenta borrar no existe")
		.expect(404, done);
	});
	
	it('DELETE /consolas/:id el id no es numero', function(done) {
		supertest(app)
		.delete('/api/consolas/ar')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')	
		.expect("Error 400: El id proporcionado no es un numero")
		.expect(400, done);
	});

});