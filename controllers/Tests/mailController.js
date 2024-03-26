const ejs = require("ejs");

module.exports = {

  verifyAccount: async (req, res) => {
    const data = {
      name: req.user.name,
      uuid: 'asdfv-fdsfdsf-123456-fdsfdsfds',
      locals: res.locals,
    };

    const viewFile = `${res.locals.views  }/email/verify-account/index.ejs`;
    const html = await ejs.renderFile(viewFile, data, {async: true});
    res.send(html);
    // res.render('email/verify-account/index', data);
  },

  resetPassword: async (req, res) => {
    const data = {
      name: req.user.name,
      uuid: 'asdfv-fdsfdsf-123456-fdsfdsfds',
      locals: res.locals,
    };

    const viewFile = `${res.locals.views   }/email/reset-password/index.ejs`;
    const html = await ejs.renderFile(viewFile, data, {async: true});
    res.send(html);
    // res.status(200).json(data);
  },
};
