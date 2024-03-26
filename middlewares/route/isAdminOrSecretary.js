const isAdminOrSecretary = (req, res, next) => {
  // if user is authenticated in the session, carry on
  if(req.isAuthenticated()) {
    if (req.user.role.slug === 'admin' || req.user.role.slug === 'secretary') {
      return next();
    }

    res.status(403);
    throw new Error('Forbbiden');
  }

  // if they aren't redirect them to the login page
  res.redirect('/');
	return true;
};

module.exports = isAdminOrSecretary;
