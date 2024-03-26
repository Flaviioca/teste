// 'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class FarmacoTipo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` FarmacoTipo will call this method automatically.
		 */
		// eslint-disable-next-line no-unused-vars
		static associate(models) {
			// define association here
			FarmacoTipo.belongsTo(models.ProjectAnimal, {
				foreignKey: 'id',
			});
		}
	}
	FarmacoTipo.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			nome: { type: DataTypes.STRING, allowNull: false },
			createdAt: {
				type: DataTypes.DATE,
				field: 'created_at',
			},
			updatedAt: {
				type: DataTypes.DATE,
				field: 'updated_at',
			},
		},
		{
			sequelize,
			tableName: 'farmaco_tipo',
			modelName: 'FarmacoTipo',
		}
	);
	return FarmacoTipo;
};
