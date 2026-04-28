const authorDB = require("../db/authorQueries");

const getAuthors = async (req, res) => {
	const authors = await authorDB.getAllAuthors();
	if (authors.length === 0) {
		return res.status(200).json({ message: "No authors exist" });
	}
	res.status(200).json(authors);
};

const getAuthor = async (req, res) => {
	const author = await authorDB.getAuthorById(req.params.id);
	if (!author) {
		return res.status(404).json({ message: "Author not found" });
	}
	res.status(200).json(author);
};

const createAuthor = async (req, res) => {
	const { author } = req.body;
	const result = await authorDB.insertAuthor({ authorName: author });
	if (!result) {
		return res.status(500).json({ message: "Cannot create author" });
	}
	res.status(201).json({ message: "Successfully created author" });
};

const updateAuthor = async (req, res) => {
	const { id } = req.params;
	const { author } = req.body;
	const result = await authorDB.updateAuthor(id, { authorName: author });
	if (!result) {
		return res.status(404).json({ message: "Cannot update author" });
	}
	res.status(200).json({ message: "Successfully updated author" });
};

const deleteAuthor = async (req, res) => {
	const { id } = req.params;
	const result = await authorDB.deleteAuthor({ authorId: id });
	if (!result) {
		return res.status(400).json({ message: "Cannot delete author" });
	}
	res.status(200).json({ message: "Successfully deleted author" });
};

module.exports = {
	getAuthors,
	getAuthor,
	createAuthor,
	updateAuthor,
	deleteAuthor,
};
