const pool = require("./pool");

// GET /authors
const getAllAuthors = async () => {
	const { rows } = await pool.query(`
        SELECT name FROM authors;
        `);
	return rows.map((row) => row.name);
};

// GET /authors/:id
const getAuthorById = async (authorId) => {
	const { rows } = await pool.query(
		`
        SELECT name FROM authors
        WHERE id = $1;
        `,
		[authorId],
	);

	return rows[0]?.name;
};

const getAuthorIdByName = async (authorName) => {
	const { rows } = await pool.query(
		`
        SELECT id FROM authors
        WHERE name = $1;
        `,
		[authorName],
	);
	return rows[0]?.id;
};

// POST /authors/
const insertAuthor = async (authorName) => {
	const { rows } = await pool.query(
		`
        INSERT INTO authors (name)
        VALUES ($1) RETURNING id;
        `,
		[authorName],
	);
	return rows[0]?.id;
};

const insertAuthorOfBook = async({ bookId, authorId }) => {
    const { rows } = await pool.query(
		`
        INSERT INTO book_authors (book_id, author_id)
        VALUES ($1, $2) RETURNING *;
        `,
		[bookId, authorId],
	);
	return rows[0];

}

// PUT /authors/:id
const updateAuthor = async (authorId, { authorName }) => {
	const { rows } = await pool.query(
		`
        UPDATE authors
        SET name = $1
        WHERE id = $2
        RETURNING id;
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
        RETURNING id;
        `,
		[authorId],
	);
	return rows[0]?.id;
};

module.exports = {
	getAllAuthors,
	getAuthorById,
	getAuthorIdByName,
	insertAuthor,
    insertAuthorOfBook,
	updateAuthor,
	deleteAuthor,
};
