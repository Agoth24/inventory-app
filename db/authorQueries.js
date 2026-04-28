const pool = require("./pool");

// GET /authors
const getAllAuthors = async () => {
	const { rows } = await pool.query(`
        SELECT * FROM authors;
        `);
	return rows;
};

// GET /authors/:id
const getAuthorById = async (authorId) => {
	const { rows } = await pool.query(
		`
        SELECT * FROM authors
        WHERE id = $1;
        `[authorId],
	);

	return rows[0];
};

// POST /authors/
const insertAuthor = async (authorName) => {
	const { rows } = await pool.query(
		`
        INSERT INTO authors (name)
        VALUES $1 RETURNING *;
        `,
		[authorName],
	);
	return rows[0];
};

// PUT /authors/:id
const updateAuthor = async (authorId, { authorName }) => {
	const { rows } = await pool.query(
		`
        UPDATE authors
        SET name = $1
        WHERE id = $2
        RETURNING *;
        `,
		[authorName, authorId],
	);
	return rows[0];
};

// DELETE /authors/:id
const deleteAuthor = async (authorId) => {
	const { rows } = await pool.query(
		`
        DELETE FROM authors
        WHERE id = $1
        RETURNING *;
        `,
		[authorId],
	);
	return rows[0];
};

module.exports = {
	getAllAuthors,
	getAuthorById,
	insertAuthor,
	updateAuthor,
	deleteAuthor,
};
