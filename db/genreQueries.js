const pool = require("./pool");

// GET /genres
const getAllGenres = async () => {
	const { rows } = await pool.query(`
        SELECT name FROM genres;
        `);
	return rows.map((row) => row.name);
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

	return rows[0]?.name;
};

const getGenreIdByName = async (genreName) => {
	const { rows } = await pool.query(
		`
        SELECT id FROM genres
        WHERE name = $1;
        `,
		[genreName],
	);
	return rows[0]?.id;
};

// POST /genres/
const insertGenre = async (genreName) => {
	const { rows } = await pool.query(
		`
        INSERT INTO genres (name) 
        VALUES ($1) RETURNING id;
        `,
		[genreName],
	);
	return rows[0]?.id;
};

// PUT /genres/:id
const updateGenre = async (genreId, { genreName }) => {
	const { rows } = await pool.query(
		`
        UPDATE genres
        SET name = $1
        WHERE id = $2
        RETURNING id;        
        `,
		[genreName, genreId],
	);
	return rows[0]?.id;
};

// DELETE /genres/:id
const deleteGenre = async (genreId) => {
	const { rows } = await pool.query(
		`
        DELETE FROM genres
        WHERE id = $1
        RETURNING id;
        `,
		[genreId],
	);
	return rows[0]?.id;
};

module.exports = {
	getAllGenres,
	getGenreById,
	getGenreIdByName,
	insertGenre,
	updateGenre,
	deleteGenre,
};
