require('dotenv').config();

const defaultValues = {
  mailer: 'smtp',
  host: 'smtp.mailtrap.io',
  port: '2525',
  username: 'teste@teste.com.br',
  password: 's3cr3t',
  encryption: 'tls',
  fromAddress: 'teste@teste.com.br',
  fromName: 'Teste',
};

module.exports = {
  mailer: process.env.MAIL_MAILER || defaultValues.mailer,
  host: process.env.MAIL_HOST || defaultValues.host,
  port: process.env.MAIL_PORT || defaultValues.port,
  username: process.env.MAIL_USERNAME || defaultValues.username,
  password: process.env.MAIL_PASSWORD || defaultValues.password,
  encryption: process.env.MAIL_ENCRYPTION || defaultValues.encryption,
  fromAddress: process.env.MAIL_FROM_ADDRESS || defaultValues.fromAddress,
  fromName: process.env.MAIL_FROM_NAME || defaultValues.fromName,

  // Creating transport instance
  transport: {
    host: process.env.MAIL_HOST || defaultValues.mailer,
    port: process.env.MAIL_PORT || defaultValues.port,
    auth: {
      user: process.env.MAIL_USERNAME || defaultValues.username,
      pass: process.env.MAIL_PASSWORD || defaultValues.password,
    },
  },
};
