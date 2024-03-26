const rfr = require('rfr');

// const { membros } = rfr('/helpers/membros');
// const { animais } = rfr('/helpers/animais');

const { Project, ProjectMember, ProjectAnimal } = require('../../models');

const saveProjectStep1 = rfr('/services/Project/update/saveProjectStep1');
const storeMemberInProjectService = rfr(
	'/services/Project/members/storeMemberInProjectService'
);
const storeProjectPareceristaService = rfr(
	'/services/Project/parecerista/storeProjectPareceristaService'
);

const RefuseProjectSecretaryService = rfr(
	'/services/Project/secretary/refuseProjectSecretary'
);

const RefuseProjectReporterService = rfr(
	'/services/Project/reporter/refuseProjectReporter'
);

const storeAnimalInProjectService = rfr(
	'/services/Project/animals/storeAnimalInProjectService'
);
const updateMemberInProjectService = rfr(
	'/services/Project/members/updateMemberInProjectService'
);
const deleteMemberInProjectService = rfr(
	'/services/Project/members/deleteMemberInProjectService'
);

const deleteProjectService = rfr('/services/Project/deleteProjectService');

const deleteAnimalInProjectService = rfr(
	'/services/Project/animals/deleteAnimalInProjectService'
);
const updateAnimalInProjectService = rfr(
	'/services/Project/animals/updateAnimalInProjectService'
);
const saveProjectStep3 = rfr('/services/Project/update/saveProjectStep3');

const saveProjectStep5 = rfr('/services/Project/update/saveProjectStep5');

const saveProjectStep7 = rfr('/services/Project/update/saveProjectStep7');

module.exports = {
	index: async (req, res) => {
		res.render('projects/index');
	},

	getMembersFromProject: async (req, res) => {
		const { uuid } = req.params;
		// Procurar no banco de dados (usar service)
		const project = await Project.findOne({
			where: {
				uuid,
			},
			include: [
				{
					model: ProjectMember,
					as: 'members',
				},
			],
			order: [[{ model: ProjectMember, as: 'members' }, 'id', 'ASC']],
		});

		// Se não existir, retorna a mensagem de não encontrado (código 404)
		if (!project) {
			res.status(400).json({ msg: 'Projeto não encontrado', result: null });
		}

		// Se existir no banco de dados, retornar a lista de membros.
		res.status(200).json({ membros: project.members, uuid });
	},

	getAnimalInProject: async (req, res) => {
		const { uuid } = req.params;
		// Procurar no banco de dados (usar service)
		const project = await Project.findOne({
			where: {
				uuid,
			},
			include: [
				{
					model: ProjectAnimal,
					as: 'animals',
				},
			],
			order: [[{ model: ProjectAnimal, as: 'animals' }, 'id', 'ASC']],
		});

		// Se não existir, retorna a mensagem de não encontrado (código 404)
		if (!project) {
			res.status(400).json({ msg: 'Animal não encontrado', result: null });
		}

		// Se existir no banco de dados, retornar a lista de membros.
		res.status(200).json({ animals: project.animals, uuid });
	},

	update: async (req, res) => {
		let result = null;

		if (req.body.action === 'step-1') {
			result = await saveProjectStep1(req);
		}
		if (req.body.action === 'step-2') {
			result = null;
		}
		if (req.body.action === 'step-3') {
			result = await saveProjectStep3(req);
		}
		if (req.body.action === 'step-4') {
			result = null;
		}
		if (req.body.action === 'step-5') {
			result = await saveProjectStep5(req);
		}
		if (req.body.action === 'step-7') {
			result = await saveProjectStep7(req);
		}

		if (!result) {
			res
				.status(400)
				.json({ msg: 'Action is missing', result: null, body: req.body });
		}

		if (result && result.hasErrors) {
			res.status(500).json({ msg: result.message, result, body: req.body });
		}

		if (result && result.approved) {
			res.status(200).json({ msg: result.message, result, body: req.body });
		}
		return true;
	},

	storePareceristaProject: async (req, res) => {
		const { uuid } = req.params; // Corrigido aqui
		const result = await storeProjectPareceristaService(req, uuid);

		if (result.hasErrors) {
			return res
				.status(400)
				.json({ msg: result.message, result, body: req.body });
		}

		return res
			.status(200)
			.json({ msg: result.message, result, body: req.body });
	},

	storeRefuseProjectSecretary: async (req, res) => {
		const { uuid } = req.params;
		const result = await RefuseProjectSecretaryService(req, uuid);

		if (result.hasErrors) {
			return res
				.status(400)
				.json({ msg: result.message, result, body: req.body });
		}

		return res
			.status(200)
			.json({ msg: result.message, result, body: req.body });
	},

	storeRefuseProjectReporter: async (req, res) => {
		const { uuid } = req.params;
		const result = await RefuseProjectReporterService(req, uuid);

		if (result.hasErrors) {
			return res
				.status(400)
				.json({ msg: result.message, result, body: req.body });
		}

		return res
			.status(200)
			.json({ msg: result.message, result, body: req.body });
	},



	storeMemberInProject: async (req, res) => {
		const result = await storeMemberInProjectService(req, req.params.uuid);

		if (!result) {
			res
				.status(400)
				.json({ msg: 'Erro ao salvar o membro', result: null, body: req.body });
		}

		if (result && result.hasErrors) {
			res.status(500).json({ msg: result.message, result, body: req.body });
		}

		if (result && result.approved) {
			res.status(200).json({ msg: result.message, result, body: req.body });
		}

		return true;
	},

	storeAnimalInProject: async (req, res) => {
		console.log(req.params.uuid);
		const result = await storeAnimalInProjectService(req, req.params.uuid);

		if (!result) {
			res
				.status(400)
				.json({ msg: 'Erro ao salvar o animal', result: null, body: req.body });
		}

		if (result && result.hasErrors) {
			res.status(500).json({ msg: result.message, result, body: req.body });
		}

		if (result && result.approved) {
			res.status(200).json({ msg: result.message, result, body: req.body });
		}

		return true;
	},

	updateMemberInProject: async (req, res) => {
		const result = await updateMemberInProjectService(req, req.params.uuid);

		if (!result) {
			res
				.status(400)
				.json({ msg: 'Erro ao salvar o membro', result: null, body: req.body });
		}

		if (result && result.hasErrors) {
			res.status(500).json({ msg: result.message, result, body: req.body });
		}

		if (result && result.approved) {
			res.status(200).json({ msg: result.message, result, body: req.body });
		}

		return true;
	},

	deleteMemberInProject: async (req, res) => {
		const result = await deleteMemberInProjectService(req, req.params.uuid);

		if (!result) {
			res.status(400).json({
				msg: 'Erro ao deletar o membro',
				result: null,
				body: req.body,
			});
		}

		if (result && result.hasErrors) {
			res.status(500).json({ msg: result.message, result, body: req.body });
		}

		if (result && result.approved) {
			res.status(200).json({ msg: result.message, result, body: req.body });
		}

		return true;
	},

	deleteProject: async (req, res) => {
		const result = await deleteProjectService(req, req.params.uuid);

		if (!result) {
			res.status(400).json({
				msg: 'Erro ao deletar o projeto',
				result: null,
				body: req.body,
			});
		}

		if (result && result.hasErrors) {
			res.status(500).json({ msg: result.message, result, body: req.body });
		}

		if (result && result.approved) {
			res.status(200).json({ msg: result.message, result, body: req.body });
		}

		return true;
	},
	deleteAnimalInProject: async (req, res) => {
		const result = await deleteAnimalInProjectService(req, req.params.uuid);

		if (!result) {
			res.status(400).json({
				msg: 'Erro ao deletar o animal',
				result: null,
				body: req.body,
			});
		}

		if (result && result.hasErrors) {
			res.status(500).json({ msg: result.message, result, body: req.body });
		}

		if (result && result.approved) {
			res.status(200).json({ msg: result.message, result, body: req.body });
		}

		return true;
	},

	updateAnimalInProject: async (req, res) => {
		const result = await updateAnimalInProjectService(req, req.params.uuid);

		if (!result) {
			res
				.status(400)
				.json({ msg: 'Erro ao salvar o membro', result: null, body: req.body });
		}

		if (result && result.hasErrors) {
			res.status(500).json({ msg: result.message, result, body: req.body });
		}

		if (result && result.approved) {
			res.status(200).json({ msg: result.message, result, body: req.body });
		}

		return true;
	},
};
