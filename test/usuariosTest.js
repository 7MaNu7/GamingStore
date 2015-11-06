var app = require('../app');
var supertest = require('supertest');
var assert = require('assert');

describe('Pruebas de usuarios', function () {

	it('GET /api/usuarios devuelve los usuarios', function (done) {
		supertest(app)
		.get('/api/usuarios')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')	
		.expect(200)
		.expect(function(result) {
			assert(result.text.indexOf('mjvr4@alu.ua.es') != -1);
		})
		.end(done);
	});

	it('GET /usuarios/:id devuelve el usuario', function (done) {
		supertest(app)
		.get('/api/usuarios/1')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')	
		.expect(200)
		.expect(function(result) {
			assert(result.text.indexOf('mjvr4@alu.ua.es') != -1);
		})
		.end(done);
	});

	it('GET /usuarios/:id usuario inexistente', function(done) {
		supertest(app)
		.get('/api/usuarios/309')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')	
		.expect("Error 404: El usuario al que intenta acceder no existe")
		.expect(404, done);
	});
	
	it('GET /usuarios/:id el id no es numero', function(done) {
		supertest(app)
		.get('/api/usuarios/ar')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')
		.expect("Error 400: El id proporcionado no es un numero")
		.expect(400, done);
	});


	it('GET /api/usuarios/:id/juegos devuelve los juegos comprados por un usuario', function (done) {
		supertest(app)
		.get('/api/usuarios/1/juegos')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')
		.expect(200)
		.expect(function(result) {
			assert(result.text.indexOf('New Super Mario Bros') != -1);
		})
		.end(done);
	});

	it('GET /api/usuarios/:id/juegos con un id no numerico', function (done) {
		supertest(app)
		.get('/api/usuarios/ar/juegos')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')
		.expect("Error 400: El id proporcionado no es un numero")
		.expect(400)
		.end(done);
	});


	it('GET /api/usuarios/:id/juegos con un usuario inexistente', function (done) {
		supertest(app)
		.get('/api/usuarios/40/juegos')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')
		.expect("Error 404: El usuario al que intenta acceder no existe")
		.expect(404)
		.end(done);
	});

	it('POST /usuarios crea el usuario', function(done) {
		supertest(app)
		.post('/api/usuarios')
		.send("nombre=Ismael&&email=isma@gmail.com")
		.expect(201, done);
	});

	it('POST /usuarios sin ConsolaId da error 400', function(done) {
		supertest(app)
		.post('/api/usuarios')
		.send("nombre=Ismael")
		.expect("Error 400: Se debe especificar un email")
		.expect(400, done);
	});

	it('POST /usuarios crear usuario con ConsolaId no numerico', function(done) {
		supertest(app)
		.post('/api/usuarios')
		.send("nombre=Ismael&&email=mjvr4@alu.ua.es")
		.expect("Error 400: El email proporcionado ya existe, escoja otro por favor")
		.expect(400, done);
	});


	it('PUT /usuarios/:id edita el usuario', function(done) {
		supertest(app)
		.put('/api/usuarios/1')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')
		.send("nombre=Ismael")
		.expect(204, done);
	});


	it('PUT /usuarios/:id el id del usuario a editar no es numerico', function(done) {
		supertest(app)
		.put('/api/usuarios/ar')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')
		.send("nombre=Ismael")
		.expect("Error 400: El id proporcionado no es un numero")
		.expect(400, done);
	});

	it('PUT /usuarios el id del usuario a editar no esta registrado', function(done) {
		supertest(app)
		.put('/api/usuarios/309')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')
		.send("nombre=Ismael")
		.expect("Error 404: El usuario que intenta modificar no existe")
		.expect(404, done);
	});

	it('PUT /usuarios/:id/juegos/:juegoId relaciona un juego con un usuario', function(done) {
		supertest(app)
		.put('/api/usuarios/1/juegos/1')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')
		.expect(204, done);
	});

	it('PUT /usuarios/:id/juegos/:juegoId de un usuario inexistente', function(done) {
		supertest(app)
		.put('/api/usuarios/20/juegos/1')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')
		.expect("Error 404: El usuario con id 20 no existe")
		.expect(404, done);
	});

	it('PUT /usuarios/:id/juegos/:juegoId de un juego inexistente', function(done) {
		supertest(app)
		.put('/api/usuarios/1/juegos/20')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')
		.expect("Error 404: El juego con id 20 no existe")
		.expect(404, done);
	});


	it('DELETE /usuarios/:id elimina el usuario', function (done) {
		supertest(app)
		.delete('/api/usuarios/1')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')
		.expect(204, done);
	});

	it('DELETE /usuarios/:id usuario inexistente', function(done) {
		supertest(app)
		.delete('/api/usuarios/309')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')
		.expect("Error 404: El usuario que intenta borrar no existe")
		.expect(404, done);
	});
	
	it('DELETE /usuarios/:id el id no es numero', function(done) {
		supertest(app)
		.delete('/api/usuarios/ar')
		.set('Authorization', 'Basic dXN1YXJpbzoxMjM0NTY=')
		.expect("Error 400: El id proporcionado no es un numero")
		.expect(400, done);
	});

});