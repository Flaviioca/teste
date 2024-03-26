const rfr = require('rfr');

const { User, Role } = rfr('/models');

module.exports = {
  index: async (req, res) => {
    const users = await User.findAll({
      order: [
        ['name', 'ASC'],
        ['id', 'ASC'],
      ],
      include: [
        {
          model: Role,
          as: 'role'
        },
      ],
    });
    res.render('index', { users });
  },

  testAdminOrSecretary(req, res) {
    res.status(200).json({ msg: 'Usuário é admin ou secretary :D !!!!', role: req.user.role });
  },

  testRole(req, res) {
    const resultados = {
      'admin': false,
      'secretary': false,
      'reporter': false,
      'vet': false,
      'researcher': false,
    };
    if (req.user.isAdmin()) {
      resultados.admin = true;
    }
    if (req.user.isSecretary()) {
      resultados.secretary = true;
    }
    if (req.user.isReporter()) {
      resultados.reporter = true;
    }
    if (req.user.isVet()) {
      resultados.vet = true;
    }
    if (req.user.isResearcher()) {
      resultados.researcher = true;
    }
    res.status(200).json({ msg: 'Teste de método de User Model', role: req.user.role, resultados });
  }
};
