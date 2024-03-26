const rfr = require('rfr');

const { ResetPassword } = rfr('/models');

const validateResetPasswordRequest = rfr('/services/Auth/validateResetPasswordRequest');
const storeResetPasswordService = rfr('/services/Auth/storeResetPasswordService');

const validateUpdateResetPassword = rfr('/services/Auth/validateUpdateResetPassword');
const updateResetPasswordService = rfr('/services/Auth/updateResetPasswordService');

const sendResetPasswordMail = rfr('/services/Mail/reset-password');

module.exports = {
  resetPassword: (req, res) => {
    res.locals.config = { ...res.locals.config, name: 'Esqueci a senha' };
    res.render('auth/reset-password');
  },

  postResetPassword: async (req, res) => {
    const response = {
      resetPassword: {},
      body: req.body,
      validate: {},
      result: {},
    };

    response.validate = validateResetPasswordRequest(req);
    if (response.validate.hasErrors) {
      res.status(400).json(response);
      return;
    }

    const result = await storeResetPasswordService(req);
    if (result.hasErrors) {
      // Verifica se o erro é devido ao usuário não encontrado
      if (result.errors.some(error => error.message.includes('Erro ao criar o reset de senha'))) {
        res.status(404).json(response);
      } else {
        res.status(400).json(response);
      }
      return;
    }

    if (result.approved) {
      // Envia o e-mail para reset de senha
      const objReset = {
        email: result.user.email,
        name: result.user.name,
        uuid: result.resetPassword.uuid,
      };

      await sendResetPasswordMail(objReset, req, res);

      response.result = result;
    }

    res.status(200).json(response);
  },

  getOneResetPassword: async (req, res, next) => {
    const { uuid } = req.params;

    if (!uuid) {
      res.status(400);
      next(new Error('Bad Request'));
      return;
    }

    const resetPassword = await ResetPassword.findOne({ where: { uuid } });
    if (!resetPassword) {
      res.status(404);
      next(new Error('Not Found'));
      return;
    }

    // res.status(200).json({resetPassword});
    res.locals.config = { ...res.locals.config, name: 'Definir nova senha' };
    res.render('auth/set-password', { resetPassword });
  },

  updateOneResetPassword: async (req, res) => {
    const response = {
      msg: 'POST /reset-password/:uuid para o usuário resetar a senha',
      body: req.body,
      validate: {},
      result: {},
    };

    response.validate = await validateUpdateResetPassword(req);
    if (response.validate.hasErrors) {
      res.status(400).json(response);
      return;
    }

    const result = await updateResetPasswordService(req);
    if (result.hasErrors) {
      response.validate = result;
      res.status(400).json(response);
      return;
    }

    if (result.approved) {
      // Enviar e-mail informando que a senha foi atualizada?
      // ...
      response.result = result;
    }

    res.status(200).json(response);
  },
};
