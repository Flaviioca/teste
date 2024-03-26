const rfr = require('rfr');

const {File} = rfr('/models');

module.exports = {
  index: async (req, res, next) => {
    const {filename} = req.params;

    if (!filename) {
      res.status(400);
      next(new Error('Bad Request'));
      return;
    }

    const file = await File.findOne({where: {filename}});
    if (!file) {
      res.status(400);
      next(new Error('Not Found'));
      return;
    }

    // Envia o arquivo
    // res.status(200).json({file});
    res.sendFile(file.path);
  },
};
