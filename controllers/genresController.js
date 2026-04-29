const genreDB = require("../db/genreQueries");

const getGenres = async (req, res) => {
	const genres = await genreDB.getAllGenres();

	if (genres.length === 0) {
		return res.status(200).json([]);
	}

	res.status(200).json(genres);
};

const getGenre = async (req, res) => {
	const genre = await genreDB.getGenreById(req.params.id);

	if (!genre) {
		return res.status(404).json([]);
	}

	res.status(200).json(genre);
};

const createGenre = async (req, res) => {
	const { genreName } = req.body || {};

	if (!genreName) {
		return res.status(400).json([]);
	}

	const insertedGenre = await genreDB.insertGenre(genreName);

	if (!insertedGenre) {
		return res.status(500).json([]);
	}

	res.status(201).json(insertedGenre);
};

const updateGenre = async (req, res) => {
	const { id } = req.params;
	const { genreName } = req.body || {};

	if (!(await genreDB.getGenreById(id))) {
		return res.status(404).json([]);
	}

	if (!genreName) {
		return res.status(400).json([]);
	}

	const updatedGenre = await genreDB.updateGenre(id, {
		genreName: genreName,
	});

	if (!updatedGenre) {
		return res.status(404).json([]);
	}

	res.status(200).json(updatedGenre);
};

const deleteGenre = async (req, res) => {
	const { id } = req.params;

	if (!(await genreDB.getGenreById(id))) {
		return res.status(404).json([]);
	}

	const deletedGenre = await genreDB.deleteGenre(id);

	if (!deletedGenre) {
		return res.status(400).json([]);
	}

	res.status(200).json(deletedGenre);
};

module.exports = {
	getGenres,
	getGenre,
	createGenre,
	updateGenre,
	deleteGenre,
};
