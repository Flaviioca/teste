const rfr = require('rfr');

const { universidades } = rfr('/helpers/universidades');
const { vinculos } = rfr('/helpers/vinculos');


const { User, Role } = rfr('/models');

const updateUserService = rfr('/services/User/updateUserService');

module.exports = {
	index: async (req, res) => {
		const users = await User.findAll({
			order: [
				['name', 'ASC'],
				['id', 'ASC'],
			],
			include: [
				{
						model: Role,
						as: 'role'
				},
			],
		});
		res.render('users/index', {users});
		// res.status(200).json({msg: '/users', role: req.user.role, users});
	},

	show: async (req, res) => {
		const { uuid } = req.params;
		const userModel = await User.findOne({
			where: {
				uuid,
			},
			include: [
				{
						model: Role,
						as: 'role'
				},
			],
		});

		res.render('users/show', {userModel});
		// res.status(200).json({msg: `/users/${user.uuid}`, user});
	},

	edit: async (req, res) => {
		const { uuid } = req.params;
		const userModel = await User.findOne({
			where: {
				uuid,
			},
			include: [
				{
						model: Role,
						as: 'role'
				},
			],
		});

		const papeis = await Role.findAll({order: [['id', 'ASC']]});

		res.render('users/edit', {userModel, universidades, vinculos, papeis});
		// res.status(200).json({msg: `/users/${user.uuid}/edit`, user});
	},

	update: async (req, res) => {

		const result = await updateUserService(req);

		if ( result.hasErrors ) {
      req.flash('error_msg', result.message);
      // eslint-disable-next-line no-unused-vars
      req.session.save((err)=> {
        res.redirect(`/users/${req.params.uuid}/edit`);
      });
    }

    if ( result.approved ) {
      // Flash message
      req.flash('success_msg', result.message);
			// eslint-disable-next-line no-unused-vars
      req.session.save((err)=> {
        res.redirect(`/users/${req.params.uuid}`);
      });
    }

		// res.status(200).json({msg: `PUT /users/${req.params.uuid}/`, requisition: req});
	},
};
