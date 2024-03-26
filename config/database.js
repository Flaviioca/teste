require('dotenv').config(); // this is important!

// Dialects: 'mysql','sqlite','postgres','mssql'
module.exports = {
  "development": {
    "username": process.env.DB_USER || 'postgres',
    "password": process.env.DB_PASS || 'postgres',
    "database": process.env.DB_DATABASE || 'ceua_database',
    "host": process.env.DB_HOST || '127.0.0.1',
    "port": process.env.DB_PORT || '5432',
    "dialect": process.env.DB_DIALECT || 'postgres',
    "logging": false,
    "migrationStorageTableName": "sequelize_meta"
  },
  "test": {
    "username": process.env.DB_USER || 'root',
    "password": process.env.DB_PASS || null,
    "database": process.env.DB_DATABASE || 'database_test',
    "host": process.env.DB_HOST || '127.0.0.1',
    "port": process.env.DB_PORT || '3306',
    "dialect": process.env.DB_DIALECT || 'mysql',
    "logging": false,
    "migrationStorageTableName": "sequelize_meta"
  },
  "production": {
    "username": process.env.DB_USER || 'postgres',
    "password": process.env.DB_PASS || 'postgres',
    "database": process.env.DB_DATABASE || 'prod_database',
    "host": process.env.DB_HOST || '127.0.0.1',
    "port": process.env.DB_PORT || '5432',
    "dialect": process.env.DB_DIALECT || 'postgres',
    "logging": false,
    "migrationStorageTableName": "sequelize_meta"
  },
  "productionHeroku": {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    protocol: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    "logging": false,
    "migrationStorageTableName": "sequelize_meta"
  },
  /*
  "heroku": {
    // https://devcenter.heroku.com/articles/heroku-postgresql#heroku-postgres-ssl
    url: process.env.DATABASE_URI,
    dialect: 'postgres',
    logging: false,
    "migrationStorageTableName": "sequelize_meta",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // very important
      }
    }
  }
  */
};
