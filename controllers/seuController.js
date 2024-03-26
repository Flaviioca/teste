// controllers/seuController.js
const rfr = require('rfr');

const { User, Role } = rfr('/models');

module.exports = {
  // ... outras funções do controlador ...

  // eslint-disable-next-line consistent-return
  async trocarPerfil(req, res) {
    try {
      const { perfil } = req.params;

      // Verificar se o perfil é válido
      const perfisPermitidos = ['researcher', 'reporter'];
      if (!perfisPermitidos.includes(perfil)) {
        return res.status(400).json({ error: 'Perfil inválido' });
      }

      // Encontrar o papel (role) correspondente ao novo perfil no banco de dados
      const novoPerfil = await Role.findOne({ where: { name: perfil } });

      // Verificar se o novo perfil foi encontrado
      if (!novoPerfil) {
        return res.status(404).json({ error: 'Perfil não encontrado' });
      }

      // Atualizar o papel (role) do usuário no banco de dados
      await User.update({ roleId: novoPerfil.id }, { where: { id: req.user.id } });

      // Retornar uma resposta de sucesso
      res.status(200).json({ success: true, msg: `Perfil trocado para ${perfil}` });
    } catch (error) {
      console.error('Erro ao trocar o perfil:', error);
      res.status(500).json({ error: 'Erro interno ao trocar o perfil' });
    }
  },
};



