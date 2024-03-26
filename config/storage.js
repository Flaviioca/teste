require('dotenv').config();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const crypto = require('crypto');

const defaultValues = {
  driver: 'local',
  path: `${process.cwd() + path.sep  }storage${  path.sep  }uploads${  path.sep}`,
};

if (!fs.existsSync(defaultValues.path)) {
  fs.mkdirSync(defaultValues.path, '0744');
}

const selectedOption = process.env.FILESYSTEM_DRIVER || defaultValues.driver;

const storages = {
  local: {
    driver: defaultValues.driver,
    path: defaultValues.path,
    storage: multer.diskStorage({
      destination (req, file, cb) {
          cb(null, defaultValues.path);
      },
      filename (req, file, cb) {
          // Extração da extensão do arquivo original:
          const filenameArray = file.originalname.split('.');
          let index = filenameArray.length - 1;
          if (index < 0) {
            index = 0;
          }
          const extensaoArquivo = filenameArray[index];

          // Cria um código randômico que será o nome do arquivo
          const novoNomeArquivo = crypto
              .randomBytes(32)
              .toString('hex');

          // Indica o novo nome do arquivo:
          cb(null, `${novoNomeArquivo}.${extensaoArquivo}`);
      }
    }),
  },
};

module.exports = {
  driver: storages[selectedOption].driver,
  path: storages[selectedOption].path,
  storage: storages[selectedOption].storage,
};
