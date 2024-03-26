require('dotenv').config(); // this is important!

const { appVersion } = require('./version');

const forceHttps = !!((process.env.FORCE_HTTPS === '1' || process.env.FORCE_HTTPS === 'true'));

module.exports = {
    name: process.env.APP_NAME || 'Express App',
    env: process.env.NODE_ENV || 'development',
    key: process.env.APP_KEY || 'S3cr3t',
		force_https: forceHttps,
    tz: process.env.TZ || 'America/Recife',
		version: appVersion,
};
