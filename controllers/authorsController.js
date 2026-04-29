const authorDB = require("../db/authorQueries");

const getAuthors = async (req, res) => {
	const authors = await authorDB.getAllAuthors();

	if (authors.length === 0) {
		return res.status(200).json([]);
	}

	res.status(200).json(authors);
};

const getAuthor = async (req, res) => {
	const author = await authorDB.getAuthorById(req.params.id);

	if (!author) {
		return res.status(404).json({});
	}

	res.status(200).json(author);
};

const createAuthor = async (req, res) => {
	const { authorName } = req.body || {};

	if (!authorName) {
		return res.status(400).json({});
	}

	const insertedAuthor = await authorDB.insertAuthor(authorName);

	if (!insertedAuthor) {
		return res.status(500).json({});
	}

	res.status(201).json(insertedAuthor);
};

const updateAuthor = async (req, res) => {
	const { id } = req.params;
	const { authorName } = req.body || {};

	if (!(await authorDB.getAuthorById(id))) {
		return res.status(404).json({});
	}

	if (!authorName) {
		return res.status(400).json({});
	}

	const updatedAuthor = await authorDB.updateAuthor(id, {
		authorName: authorName,
	});

	if (!updatedAuthor) {
		return res.status(500).json({});
	}

	res.status(200).json(updatedAuthor);
};

const deleteAuthor = async (req, res) => {
	const { id } = req.params;

	if (!(await authorDB.getAuthorById(id))) {
		return res.status(404).json({});
	}

	const deletedAuthor = await authorDB.deleteAuthor(id);

	if (!deletedAuthor) {
		return res.status(500).json({});
	}

	res.status(200).json(deletedAuthor);
};

module.exports = {
	getAuthors,
	getAuthor,
	createAuthor,
	updateAuthor,
	deleteAuthor,
};
