'use strict';

module.exports = function(sequelize, DataTypes) {

	var Juego = sequelize.define('Juego', {
		nombre: DataTypes.STRING,
		descripcion: DataTypes.TEXT,
		genero: DataTypes.STRING
	}, {
			classMethods: {
	         associate: function(models) {
	           Juego.belongsTo(models.Consola, {
					constraints: false,
					foreignKey: { allowNull: false }, 
					onDelete: 'CASCADE'
				});
				Juego.belongsToMany(models.Usuario, {through: 'UsuarioJuego'})
	         }
	       }
	}, {
			name: {singular: 'Juego', plural: 'Juegos'}
	});

	return Juego;
}
