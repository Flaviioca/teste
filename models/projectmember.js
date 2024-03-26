const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProjectMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProjectMember.belongsTo(models.Project, {
				foreignKey: 'project_id',
				as: 'project',
			});
    }
  }
  ProjectMember.init({
		id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    project_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
		email: DataTypes.STRING,
    doc_type: DataTypes.STRING,
    doc: DataTypes.STRING,
    vinculo: DataTypes.INTEGER,
    university: DataTypes.INTEGER,
    campus: DataTypes.STRING,
		departamento: DataTypes.STRING,
		lattes_url: DataTypes.STRING,
    experiencia: DataTypes.STRING,
    experiencia_tempo: DataTypes.STRING,
    experiencia_unidade: DataTypes.STRING,
    treinamento: DataTypes.STRING,
    treinamento_tempo: DataTypes.STRING,
    treinamento_unidade: DataTypes.STRING,
    certificado_treinamento: DataTypes.STRING,
		observacoes: DataTypes.TEXT,
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
		tableName: 'project_members',
    modelName: 'ProjectMember',
  });
  return ProjectMember;
};
