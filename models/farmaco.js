// 'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class FarmacoAnimal extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` FarmacoAnimal will call this method automatically.
		 */
		// eslint-disable-next-line no-unused-vars
		static associate(models) {
			// define association here
			FarmacoAnimal.belongsTo(models.ProjectAnimal, {
				foreignKey: 'animal_id',
			});
			FarmacoAnimal.belongsTo(models.FarmacoTipo, {
				foreignKey: 'farmaco_tipo_id',
			});
		}
	}
	FarmacoAnimal.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			animal_id: { type: DataTypes.STRING, allowNull: false },
			farmaco_tipo_id: { type: DataTypes.STRING, allowNull: false },
			nome: { type: DataTypes.STRING, allowNull: false },
			via_administracao: { type: DataTypes.STRING, allowNull: false },
			dose_unidade: { type: DataTypes.STRING, allowNull: false },
			frequencia: { type: DataTypes.STRING, allowNull: false },
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
			tableName: 'project_animal_farmacos',
			modelName: 'FarmacoAnimal',
		}
	);
	return FarmacoAnimal;
};
