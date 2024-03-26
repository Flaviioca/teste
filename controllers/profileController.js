const rfr = require('rfr');

const { File, Role } = rfr('/models');
const updateUserService = rfr('/services/User/updateUserService');
const validateProfileResetPassword = rfr(
	'services/User/validateProfileResetPassword'
);
const updateProfilePasswordService = rfr(
	'/services/User/updateProfilePasswordService'
);
const verifyAccountService = rfr('/services/User/verifyAccountService');
const storeFileService = rfr('/services/File/storeFileService');
const deleteFileService = rfr('/services/File/deleteFileService');
const sendVerifyAccountMail = rfr('/services/Mail/verify-account');

const { universidades } = rfr('/helpers/universidades');
const { vinculos } = rfr('/helpers/vinculos');

module.exports = {
	index: async (req, res) => {
		const response = {
			msg: 'GET /profile para o usuário visualizar o próprio perfil',
			user: req.user, // get the user out of session and pass to template
			headers: req.headers,
			config: res.locals.config,
			params: req.params,
			query: req.query,
			files: [],
		};

		const files = await File.findAll({
			where: { user_id: req.user.id, category: 'profile' },
			order: [['name', 'ASC']],
		});

		if (files) {
			response.files = files;
		}

		if (req.query.json) {
			res.status(200).json(response);
			return;
		}

		// res.status(200).json({result: response});
		res.render('profile/index', { response });
	},

	edit: async (req, res) => {
		const papeis = await Role.findAll({ order: [['id', 'ASC']] });
		res.render('profile/edit', { universidades, vinculos, papeis });
	},

	update: async (req, res) => {
		// eslint-disable-next-line no-unused-vars
		const response = {
			msg: 'PUT /profile para o usuário atualizar o próprio perfil',
			user: req.user, // get the user out of session and pass to template
			headers: req.headers,
			config: res.locals.config,
			params: req.params,
			query: req.query,
			body: req.body,
		};
		// res.status(200).json(response.body);

		const result = await updateUserService(req);
		if (result.hasErrors) {
			req.flash('error_msg', result.message);
			// eslint-disable-next-line no-unused-vars
			req.session.save((err) => {
				res.redirect('/profile/edit');
			});
		}

		if (result.approved) {
			// Flash message
			req.flash('success_msg', result.message);
			// eslint-disable-next-line no-unused-vars
			req.session.save((err) => {
				res.redirect('/profile');
			});
		}
	},

	profileResetPassword: (req, res) => {
		res.render('profile/reset-password');
	},

	updateProfilePassword: async (req, res) => {
		const response = {
			body: req.body,
			validate: {},
		};

		response.validate = await validateProfileResetPassword(req);

		res.locals.body = req.body;
		res.locals.validate = response.validate;

		if (response.validate.hasErrors) {
			res.render('profile/reset-password');
			return;
		}

		const result = await updateProfilePasswordService(req);
		if (result.hasErrors) {
			res.locals.validate = result;
			res.render('profile/reset-password');
			return;
		}

		if (result.approved) {
			// Flash message
			req.flash('success_msg', result.message);
			// eslint-disable-next-line no-unused-vars
			req.session.save((err) => {
				res.redirect('/profile/reset-password');
			});
		}
	},

	verifyAccount: async (req, res) => {
		const { uuid } = req.params;
		if (!uuid) {
			res.redirect('/');
			return;
		}

		// res.status(200).json({params: req.params});
		const result = await verifyAccountService(req);
		if (result.hasErrors) {
			req.flash('error_msg', result.message);
			// eslint-disable-next-line no-unused-vars
			req.session.save((err) => {
				res.redirect('/login');
			});
			return;
		}

		if (result.approved) {
			// Flash message
			req.flash('success_msg', result.message);
			// eslint-disable-next-line no-unused-vars
			req.session.save((err) => {
				res.redirect('/login');
			});
		}
	},
	resendVerifyAccount: async (req, res) => {
		const result = {
			user: {},
			msg: '',
			code: 400,
		};

		if (req.user) {
			// Envia o e-mail para verificar a conta
			const objVerify = {
				email: req.user.email,
				name: req.user.name,
				uuid: req.user.uuid,
			};
			try {
				await sendVerifyAccountMail(objVerify, req, res);
				result.user = req.user;
				result.msg = 'e-mail enviado';
				result.code = 200;
			} catch (err) {
				result.code = 500;
				result.msg = `Ocorreu um erro ao enviar a mensagem. Erro: ${err.message}`;
			}
		}

		return res.status(200).json(result);
	},

	uploadFile: async (req, res) => {
		// eslint-disable-next-line no-unused-vars
		const payload = {
			file: req.file,
			body: req.body,
			params: req.params,
			query: req.query,
			user: req.user,
		};

		// res.status(200).json({msg: 'upload file', payload});
		const result = await storeFileService(req);
		if (result.hasErrors) {
			// Flash message
			req.flash('error_msg', result.message);
		}

		if (result.approved) {
			// Flash message
			req.flash('success_msg', result.message);
		}

		// res.status(200).json({result: result});
		// eslint-disable-next-line no-unused-vars
		req.session.save((err) => {
			res.redirect('/profile');
		});
	},

	deleteFile: async (req, res) => {
		// res.status(200).json({msg: 'Apagar arquivo'});

		const result = await deleteFileService(req);
		if (result.hasErrors) {
			// Flash message
			req.flash('error_msg', result.message);
		}

		if (result.approved) {
			// Flash message
			req.flash('success_msg', result.message);
		}

		// res.status(200).json({result: result});
		// eslint-disable-next-line no-unused-vars
		req.session.save((err) => {
			res.redirect('/profile');
		});
	},
};
