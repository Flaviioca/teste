const rfr = require('rfr');

const validateUserRegister = rfr('/services/User/validateUserRegisterService');
const storeUserService = rfr('/services/User/storeUserService');

const sendVerifyAccountMail = rfr('/services/Mail/verify-account');

module.exports = {
  index: (req, res) => {
    res.locals.config = {...res.locals.config, name: 'Cadastrar usuário'};
    res.render('auth/register');
  },

  store: async (req, res) => {
    const response = {
        msg: 'POST /register para o usuário se cadastrar',
        headers: req.headers,
        body: req.body,
        validate: {},
    };

    response.validate = await validateUserRegister(req);

    res.locals.config = {...res.locals.config, name: 'Cadastrar usuário'};
    res.locals.body = req.body;
    res.locals.validate = response.validate;

    if (response.validate.hasErrors) {
      res.render('auth/register');
      return; // return next(); causa uma exception no express
    }

    const result = await storeUserService(req);
    if ( result.hasErrors ) {
      res.locals.validate = result;
      res.render('auth/register');
      return;
    }

    if ( result.approved ) {
      // Envia o e-mail para verificar a conta
      const objVerify = {
        email: result.user.email,
        name: result.user.name,
        uuid: result.user.uuid,
      };

      await sendVerifyAccountMail(objVerify, req, res);

      // Flash message
      req.flash('success_msg', result.message);
      // eslint-disable-next-line no-unused-vars
      req.session.save((err) => {
        res.redirect('/login');
      });
    }
  },
};
