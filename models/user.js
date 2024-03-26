// 'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.belongsTo(models.Role, {
				foreignKey: 'role_id',
				as: 'role',
			});
			User.belongsToMany(models.Project, {
				through: 'project_users',
				foreignKey: 'userId',
				otherKey: 'projectId',
				as: 'projects',
			});
		}

		isAdmin() {
			if (this.role.slug === 'admin') {
				return true;
			}
			return false;
		}

		isSecretary() {
			if (this.role.slug === 'secretary') {
				return true;
			}
			return false;
		}

		isReporter() {
			if (this.role.slug === 'reporter') {
				return true;
			}
			return false;
		}

		isVet() {
			if (this.role.slug === 'vet') {
				return true;
			}
			return false;
		}

		isResearcher() {
			if (this.role.slug === 'researcher') {
				return true;
			}
			return false;
		}
	}
	User.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			uuid: DataTypes.STRING,
			name: DataTypes.STRING,
			tipo_doc: DataTypes.STRING,
			doc: DataTypes.STRING,
			email: DataTypes.STRING,
			email_verified_at: DataTypes.DATE,
			password: DataTypes.STRING,
			cpf: DataTypes.STRING, // TODO: remover o campo, agora usado a coluna Doc (criar migration para remover também)
			phone: DataTypes.STRING,
			telefone: DataTypes.STRING,
			university: DataTypes.INTEGER,
			vinculo: DataTypes.INTEGER,
			campus: DataTypes.STRING,
			area_de_atuacao: DataTypes.STRING,
			lattes: DataTypes.STRING,
			experiencia: DataTypes.STRING,
			experiencia_tempo: DataTypes.STRING,
			experiencia_unidade: DataTypes.STRING,
			treinamento: DataTypes.STRING,
			treinamento_tempo: DataTypes.STRING,
			treinamento_unidade: DataTypes.STRING,
			certificado_treinamento: DataTypes.STRING,
			state: DataTypes.SMALLINT,
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
			tableName: 'users',
			modelName: 'User',
			defaultScope: {
				attributes: { exclude: ['password'] },
			},
			scopes: {
				withPassword: {
					attributes: {},
				},
			},
		}
	);
	return User;
};
