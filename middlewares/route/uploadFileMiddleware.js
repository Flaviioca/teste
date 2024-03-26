const multer  = require('multer');
const rfr = require('rfr');

const storageConfig = rfr('/config/storage').storage;
const uploadFileMiddleware = multer({ storage: storageConfig });

module.exports = uploadFileMiddleware;
