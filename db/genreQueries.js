const pool = require("./pool");

// GET /genres
const getAllGenres = async () => {
	const { rows } = await pool.query(`
        
        `);
	return rows;
};

// GET /genres/:id
const getGenreById = async ({ genreId }) => {
	const { rows } = await pool.query(`
        
        `);

	return rows[0];
};

// POST /genres/
const insertGenre = async ({ genreName }) => {
	const { rows } = await pool.query(`
        
        `);
	return rows[0];
};

// PUT /genres/:id
const updateGenre = async (genreId, { genreName }) => {
	const { rows } = await pool.query(`
            
        `);
	return rows[0];
};

// DELETE /genres/:id
const deleteGenre = async ({ genreId }) => {
	const { rows } = await pool.query(`
        
        `);
	return rows[0];
};

module.exports = {
	getAllGenres,
	getGenreById,
	insertGenre,
	updateGenre,
	deleteGenre,
};
