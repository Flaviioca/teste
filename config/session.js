require('dotenv').config();
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const defaultValues = {
  driver: 'file',
  dir: '',
  maxAge: 60 * 1000 * 60 * 24 * 7, // Expires after 1 week
};

const fileStoreOptions = {
  path: `${process.cwd() + path.sep  }storage${  path.sep  }sessions`,
};

const sessions = {
  file: {
    store: new FileStore(fileStoreOptions),
    maxAge: process.env.SESSION_LIFETIME || defaultValues.maxAge,
  },
  memory: {
    store: null,
    maxAge: defaultValues.maxAge,
  }
};

const selectedOption = process.env.SESSION_DRIVER || defaultValues.driver;

module.exports = {
  fileStoreOptions,
  store: sessions[selectedOption].store,
};
