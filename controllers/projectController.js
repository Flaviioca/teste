/* eslint-disable radix */
/* eslint-disable consistent-return */
const rfr = require('rfr');
const { Op } = require('sequelize');

const { universidades } = rfr('/helpers/universidades');
const { vinculos } = rfr('/helpers/vinculos');
const { vinculosMembros } = rfr('/helpers/vinculos/vinculosMembros');
const { finalidades } = rfr('/helpers/finalidades');
const { farmacos } = rfr('/helpers/farmacos');
const { areas } = rfr('/helpers/subareas');
const { especies } = rfr('/helpers/especies');
const { sexo } = rfr('/helpers/sexo');
const { idademedida } = rfr('/helpers/idade_medida');
const { pesomedida } = rfr('/helpers/peso_medida');
const { origem } = rfr('/helpers/origem');
const { instalacao } = rfr('/helpers/instalacao');
const { tipodecama } = rfr('/helpers/tipodecama');
const { estresse } = rfr('/helpers/estresse');
const { inibidordedor } = rfr('/helpers/inibidordedor');

const storeProjectService = rfr('/services/Project/storeProjectService');
const getFromList = rfr('/services/Utils/getFromList');

const {
	Project,
	User,
	File,
	Role,
	ProjectOwner,
	ProjectInvasividade,
	ProjectMember,
	ProjectAnimal,
	justificativa,
} = rfr('/models');

const storeFileService = rfr('/services/File/storeFileService');
const deleteFileService = rfr('/services/File/deleteFileService');

module.exports = {
	index: async (req, res) => {
		const { year, month, hasRelator, isDenied } = req.query;
		res.locals.user = req.user;
		let projects;

		if (res.locals.user.isAdmin()) {
			projects = await Project.findAll({
				include: [
					{
						model: justificativa,
						as: 'justificativas',
					},
				],
				order: [
					['createdAt', 'DESC'],
					['id', 'DESC'],
				],
			});
		} else if (res.locals.user.isSecretary()) {
			projects = await Project.findAll({
				where: {
					state: {
						[Op.in]: [1, 2, 3, 7],
					},
				},
				order: [
					['createdAt', 'DESC'],
					['id', 'DESC'],
				],
				include: [
					{
						model: justificativa,
						as: 'justificativas',
					},
				],
			});
		} 
		
		
		else if (res.locals.user.isReporter()) {
			projects = await Project.findAll({
				where: {
					state: {
						[Op.in]: [1, 2, 3, 7],
					},
				},
				order: [
					['createdAt', 'DESC'],
					['id', 'DESC'],
				],
				include: [
					{
						model: justificativa,
						as: 'justificativas',
					},
				],
			});
		} 
		
		
		
		else {
			projects = await Project.findAll({
				where: {
					state: {
						[Op.in]: [0, 1, 2, 3, 4, 5, 7],
					},
					user_id: res.locals.user.id,
				},
				include: [
					{
						model: justificativa,
						as: 'justificativas',
					},
				],
				order: [
					['createdAt', 'DESC'],
					['id', 'DESC'],
				],
			});
		}

		if (year) {
			projects = projects.filter(
				(project) => project.createdAt.getFullYear() === parseInt(year)
			);
		}
		if (month) {
			projects = projects.filter(
				(project) => project.createdAt.getMonth() + 1 === parseInt(month)
			);
		}
		if (hasRelator) {
			projects = projects.filter(
				(project) => project.parecerista_uuid !== null
			);
		}

		if (isDenied) {
			projects = projects.filter((project) => project.state === 7);
		}

		res.render('projects/index', {
			projects,
			finalidades,
			areas,
		});
	},

	create: (req, res) => {
		res.render('projects/create', { finalidades });
	},

	store: async (req, res) => {
		// Validar os dados de entrada
		// Salvar no banco de dados (usar service)
		const result = await storeProjectService(req);

		if (result.hasErrors) {
			req.flash('error_msg', result.message);
			// eslint-disable-next-line no-unused-vars
			req.session.save((err) => {
				res.redirect('/projects/create');
			});
		}

		if (result.approved) {
			// Flash message
			req.flash('success_msg', result.message);
			// eslint-disable-next-line no-unused-vars
			req.session.save((err) => {
				res.redirect(`/projects/${result.project.uuid}/edit`);
			});
		}

		// Se deu tudo certo, redirecionar o usuário para a página de edição
		// res.redirect(`/projects/${uuid}/edit`);
		return true;
	},

	show: async (req, res) => {
		const { uuid } = req.params;
		try {
			// Query the database to retrieve the project, including the realname
			const project = await Project.findOne({
				where: {
					uuid,
				},
				include: [
					{
						model: ProjectAnimal,
						as: 'animals',
					},
					{
						model: ProjectMember,
						as: 'members',
					},
					{
						model: ProjectOwner,
						as: 'owner',
					},
					{
						model: User,
						as: 'user',
					},
					{
						model: ProjectInvasividade,
						as: 'invasividade',
					},
				],
			});

			console.log(project.parecerista_uuid);
			const parecerista = await User.findOne({
				where: {
					uuid: project.parecerista_uuid,
				},
			});

			if (!project) {
				return res.status(404).json({ msg: 'Project not found', result: null });
			}

			res.render('projects/show', { project, parecerista });

			// Render the EJS template, passing the 'project' variable to the template
		} catch (error) {
			// console.error('Error retrieving project:', error);
			return res
				.status(500)
				.json({ msg: 'Internal server error', result: null });
		}
	},

	submitToParecerista: async (req, res) => {
		const { uuid } = req.params;
		try {
			const project = await Project.findOne({
				where: {
					uuid,
				},
				include: [
					{
						model: ProjectAnimal,
						as: 'animals',
					},
					{
						model: ProjectMember,
						as: 'members',
					},
					{
						model: ProjectOwner,
						as: 'owner',
					},
					{
						model: User,
						as: 'user',
					},
					{
						model: ProjectInvasividade,
						as: 'invasividade',
					},
				],
			});

			const pareceristas = await User.findAll({
				include: [
					{
						model: Role,
						as: 'role',
						where: { id: 3 },
					},
				],
			});

			if (!project) {
				return res.status(404).json({ msg: 'Project not found', result: null });
			}
			if (!pareceristas) {
				return res
					.status(404)
					.json({ msg: 'Pareceristas not found', result: null });
			}

			res.render('projects/submitToParecerista', { project, pareceristas });

			// Render the EJS template, passing the 'project' variable to the template
		} catch (error) {
			return res
				.status(500)
				.json({ msg: 'Internal server error', result: null });
		}
	},

	refuseProject: async (req, res) => {
		const { uuid } = req.params;
		try {
			const project = await Project.findOne({
				where: {
					uuid,
				},
				include: [
					{
						model: ProjectAnimal,
						as: 'animals',
					},
					{
						model: ProjectMember,
						as: 'members',
					},
					{
						model: ProjectOwner,
						as: 'owner',
					},
					{
						model: User,
						as: 'user',
					},
					{
						model: ProjectInvasividade,
						as: 'invasividade',
					},
				],
			});

			if (!project) {
				return res.status(404).json({ msg: 'Project not found', result: null });
			}

			res.render('projects/refuseProject', { project });
		} catch (error) {
			return res
				.status(500)
				.json({ msg: 'Internal server error', result: null });
		}
	},

	edit: async (req, res) => {
		const { uuid } = req.params;
		// Procurar no banco de dados (usar service)

		// Se não existir, exibe a mensagem de não encontrado (código 404)
		// VER como foi implementado em outros cantos

		// Se existir no banco de dados, injeto o projeto na View
		/*
		const projeto = {
			title_pt_br: 'Em construção Editado',
			title_en: 'Under Construction',
			finalidade_id: '4',
			finalidade: finalidades[3],
			membros: [],
			animais: [],
		};
		*/
		const projeto = await Project.findOne({
			where: {
				uuid,
			},
			include: [
				{
					model: ProjectOwner,
					as: 'owner',
				},
				{
					model: User,
					as: 'user',
				},
			],
		});

		if (!projeto) {
			req.flash('error_msg', 'Projeto não encontrado');
			// eslint-disable-next-line no-unused-vars
			req.session.save((err) => {
				res.redirect('/projects');
			});
		} else {
			projeto.setDataValue(
				'finalidade',
				getFromList(projeto.reason, finalidades)
			);

			const files = await File.findAll({
				where: { user_id: req.user.id, category: 'project' },
				order: [['name', 'ASC']],
			});

			// res.status(200).json(projeto);

			res.render('projects/edit/index', {
				uuid,
				universidades,
				vinculos,
				vinculosMembros,
				finalidades,
				farmacos,
				areas,
				projeto,
				especies,
				sexo,
				idademedida,
				pesomedida,
				origem,
				instalacao,
				tipodecama,
				estresse,
				inibidordedor,
				files,
			});
		}

		return true;
	},

	update: async (req, res) => {
		res.status(200).json({ msg: 'PUT projetcs update' });
	},

	destroy: async (req, res) => {
		res.status(200).json({ msg: 'DELETE projetcs destroy' });
	},

	uploadFile: async (req, res) => {
		const { uuid } = req.params;
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
			res.redirect(`/projects/${uuid}/edit`);
		});
	},

	deleteFile: async (req, res) => {
		const { uuid } = req.params;
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
			res.redirect(`/projects/${uuid}/edit`);
		});
	},
};
