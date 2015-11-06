'use strict';

module.exports = function(sequelize, DataTypes) {

	var Consola = sequelize.define('Consola', {
		nombre: DataTypes.STRING,
		descripcion: DataTypes.TEXT,
	}, {
			classMethods: {
	         associate: function(models) {
					Consola.hasMany(models.Juego)
	         }
	       }
	}, {
			name: {singular: 'Consola', plural: 'Consolas'}
	});

	return Consola;
}
