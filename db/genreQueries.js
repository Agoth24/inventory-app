const pool = require("./pool");

// GET /genres
const getAllGenres = async () => {
	const { rows } = await pool.query(`
        SELECT name FROM genres;
        `);
	return rows;
};

// GET /genres/:id
const getGenreById = async (genreId) => {
	const { rows } = await pool.query(
		`
        SELECT name FROM genres
        WHERE id = $1
        `,
		[genreId],
	);

	return rows[0];
};

const getGenreIdByName = async (genreName) => {
	const { rows } = await pool.query(
		`
        SELECT id FROM genres
        WHERE name = $1;
        `,
		[genreName],
	);
	return rows[0];
};

// POST /genres/
const insertGenre = async (genreName) => {
	const { rows } = await pool.query(
		`
        INSERT INTO genres (name) 
        VALUES $1 RETURNING *;
        `,
		[genreName],
	);
	return rows[0];
};

// PUT /genres/:id
const updateGenre = async (genreId, { genreName }) => {
	const { rows } = await pool.query(
		`
        UPDATE genres
        SET name = $1
        WHERE id = $2
        RETURNING *;        
        `,
		[genreName, genreId],
	);
	return rows[0];
};

// DELETE /genres/:id
const deleteGenre = async (genreId) => {
	const { rows } = await pool.query(
		`
        DELETE FROM genres
        WHERE id = $1
        RETURNING *;
        `,
		[genreId],
	);
	return rows[0];
};

module.exports = {
	getAllGenres,
	getGenreById,
    getGenreIdByName,
	insertGenre,
	updateGenre,
	deleteGenre,
};
