const isLoggedOut = (req, res, next) => {
  // if user is authenticated in the session, carry on
  if(!req.isAuthenticated()) {
    return next();
  }

  // if they aren't redirect them to the login page
  res.redirect('/');
	return true;
};

module.exports = isLoggedOut;
