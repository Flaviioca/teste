const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProjectOwner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      ProjectOwner.belongsTo(models.Project, {
				foreignKey: 'project_id',
				as: 'project',
			});
    }
  }
  ProjectOwner.init({
		id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
		project_id: DataTypes.INTEGER,
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		doc: DataTypes.STRING,
		doc_type: DataTypes.STRING,
		phone: DataTypes.STRING,
		cellphone: DataTypes.STRING,
		university: DataTypes.STRING,
		university_name: DataTypes.STRING,
		campus: DataTypes.STRING,
		area_de_atuacao: DataTypes.STRING,
		lattes: DataTypes.STRING,
		vinculo: DataTypes.INTEGER,
		experiencia: DataTypes.STRING,
		experiencia_tempo: DataTypes.STRING,
		experiencia_unidade: DataTypes.STRING,
		treinamento: DataTypes.STRING,
		treinamento_tempo: DataTypes.STRING,
		treinamento_unidade: DataTypes.STRING,
		treinamento_certificado: DataTypes.STRING,
		createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  }, {
    sequelize,
		tableName: 'project_owners',
    modelName: 'ProjectOwner',
  });
  return ProjectOwner;
};
