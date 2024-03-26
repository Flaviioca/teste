const userHasCpf = (req, res, next) => {
  // if user is authenticated in the session, carry on
  if(req.isAuthenticated()) {
		let approved = true;

    if (!req.user.doc) {
      approved = false;
    }
		if (!req.user.university) {
      approved = false;
    }
		if (!req.user.vinculo) {
      approved = false;
    }
		if (!req.user.campus) {
      approved = false;
    }
		if (!req.user.area_de_atuacao) {
      approved = false;
    }

		if (approved) {
			return next();
		}

    // if they aren't redirect them to the login page
    req.flash('error_msg', 'Cadastro incompleto');
    // eslint-disable-next-line no-unused-vars
    req.session.save((err)=> {
      res.redirect('/profile/edit');
    });
  }

	return true;
};

module.exports = userHasCpf;
