const genreDB = require("../db/genreQueries");

const getGenres = async (req, res) => {
	const genres = await genreDB.getAllGenres();

	if (genres.length === 0) {
		return res.status(200).json({ message: "No genres exist" });
	}

	res.status(200).json(genres);
};

const getGenre = async (req, res) => {
	const genre = await genreDB.getGenreById(req.params.id);

	if (!genre) {
		return res.status(404).json({ message: "Genre not found" });
	}

	res.status(200).json(genre);
};

const createGenre = async (req, res) => {
	const { genreName } = req.body || {};

	if (!genreName) {
		return res.status(400).json({ message: "Error: missing fields" });
	}

	const result = await genreDB.insertGenre(genreName);

	if (!result) {
		return res.status(500).json({ message: "Cannot create genre" });
	}

	res.status(201).json({ message: "Successfully created genre" });
};

const updateGenre = async (req, res) => {
	const { id } = req.params;
	const { genreName } = req.body || {};

	if (!genreName) {
		return res.status(400).json({ message: "Error: missing fields" });
	}

	if (!(await genreDB.getGenreById(id))) {
		return res.status(404).json({ message: "Genre doesn't exist" });
	}

	const result = await genreDB.updateGenre(id, { genreName: genreName });

	if (!result) {
		return res.status(404).json({ message: "Cannot update genre" });
	}

	res.status(200).json({ message: "Successfully updated genre" });
};

const deleteGenre = async (req, res) => {
	const { id } = req.params;
    
	if (!(await genreDB.getGenreById(id))) {
        return res.status(404).json({ message: "Genre doesn't exist" });
	}
    
    const result = await genreDB.deleteGenre(id);
    
	if (!result) {
		return res.status(400).json({ message: "Cannot delete genre" });
	}

	res.status(200).json({ message: "Successfully deleted genre" });
};

module.exports = {
	getGenres,
	getGenre,
	createGenre,
	updateGenre,
	deleteGenre,
};
