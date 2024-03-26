/* eslint-disable radix */
/* eslint-disable consistent-return */
const rfr = require('rfr');
const { Op } = require('sequelize');

const { File } = rfr('/models');

module.exports = {
	index: async (req, res) => {
		console.log('index');
		const { year, month } = req.query;
		res.locals.user = req.user;
		let files;

		if (res.locals.user.isAdmin()) {
			files = await File.findAll({
				order: [
					['createdAt', 'DESC'],
					['id', 'DESC'],
				],
			});
		} else if (res.locals.user.isSecretary()) {
			files = await File.findAll({
				order: [
					['createdAt', 'DESC'],
					['id', 'DESC'],
				],
			});
		} 
		
		
		else if (res.locals.user.isReporter()) {
			files = await File.findAll({
				order: [
					['createdAt', 'DESC'],
					['id', 'DESC'],
				],
			});
		} 
		
		
		
		else {
			files = await File.findAll({
				order: [
					['createdAt', 'DESC'],
					['id', 'DESC'],
				],
			});
		}

		if (year) {
			files = files.filter(
				(files) => files.createdAt.getFullYear() === parseInt(year)
			);
		}
		if (month) {
			files = files.filter(
				(files) => files.createdAt.getMonth() + 1 === parseInt(month)
			);
		}

		res.render('files/index', {
			files,
		});
	},
};
