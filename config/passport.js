/**
 * Ref.: https://github.com/pardeepdhingra-zz/local-authenticate/blob/master/config/passport.js
 * Ref.: https://github.com/zapstar/node-sequelize-passport/blob/master/config/passport.js
 */

// load all the things we need
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');

// load the user model
const {User} = require('../models');
const {Role} = require('../models');

// eslint-disable-next-line no-unused-vars
const findUser = async (username) => {
	const user = await User.findOne({where: {name: username} });
  return user;
};

const findUserById = async (id) => {
   const user = await User.findByPk(id, {
    include: [
			{
					model: Role,
					as: 'role'
			},
    ],
  });
	return user;
};

const findUserByEmail = async (email, scope = 'default') => {
  // return users.find(user => user.email === email);
	let user = {};

  if (scope === 'withPassword') {
		user = await User.scope('withPassword').findOne({where: {email} });
    return user;
  }

	user = await User.findOne({where: {email} });
  return user;
};

passport.use(
	new LocalStrategy(
		{usernameField: 'email', passwordField:'password'},
		(async (email, password, done) => {
			try {
				const user = await findUserByEmail(email, 'withPassword');

				// usuário inexistente
				if (!user) {
					return done(null, false, { type: 'error', message: `Usuário desconhecido ${  email}` });
				}

				// comparando as senhas
				const isValid = bcrypt.compareSync(password, user.password);
				if (!isValid) {
					return done(null, false, { type: 'error', message: 'Senha inválida' });
				}

				const sessionUser = await findUserById(user.id);
				return done(null, sessionUser);

			} catch (err) {
				done(err, false);
				return null;
			}
		})
	)
);

// serialize session, only store user id in the session information
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// from the user id, figure out who the user is...
passport.deserializeUser(async (userId, done)=> {
  try {
    const user = await findUserById(userId);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
