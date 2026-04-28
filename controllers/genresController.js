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
    const { genre } = req.body;
    const result = await genreDB.insertGenre({ genreName: genre });
    if (!result) {
        return res.status(500).json({ message: "Cannot create genre" });
    }
    res.status(201).json({ message: "Successfully created genre" });
};

const updateGenre = async (req, res) => {
    const { id } = req.params;
    const { genre } = req.body;
    const result = await genreDB.updateGenre(id, { genreName: genre });
    if (!result) {
        return res.status(404).json({ message: "Cannot update genre" });
    }
    res.status(200).json({ message: "Successfully updated genre" });
};

const deleteGenre = async (req, res) => {
    const { id } = req.params;
    const result = await genreDB.deleteGenre({genreId: id});
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
