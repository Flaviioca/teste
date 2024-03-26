module.exports = {
	index: (req, res) => {
		res.locals.config = { ...res.locals.config, name: 'Login no CEUA UFPE' };
		res.render('auth/login');
	},

	logout: (req, res, next) => {
		req.logout((err) => {
			if (err) {
				return next(err);
			}

			req.flash('success_msg', 'Deslogado com sucesso');
			res.redirect('/');
			return true;
		});
	},
};
