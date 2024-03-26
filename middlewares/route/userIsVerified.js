const userIsVerified = (req, res, next) => {
  // if user is authenticated in the session, carry on
  if(req.isAuthenticated()) {
    if (req.user.email_verified_at) {
      return next();
    }

    // if they aren't redirect them to the login page
    req.flash('error_msg', 'Conta não verificada');
    // eslint-disable-next-line no-unused-vars
    req.session.save((err)=> {
      res.redirect('/profile');
    });
  }

	return true;
};

module.exports = userIsVerified;
