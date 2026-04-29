const pool = require("./pool");

// GET /authors
const getAllAuthors = async () => {
	const { rows } = await pool.query(`
        SELECT id, name as "authorName" 
        FROM authors;
        `);
	return rows;
};

// GET /authors/:id
const getAuthorById = async (authorId) => {
	const { rows } = await pool.query(
		`
        SELECT id, name as "authorName" 
        FROM authors
        WHERE id = $1;
        `,
		[authorId],
	);

	return rows[0];
};

const getAuthorByName = async (authorName) => {
	const { rows } = await pool.query(
		`
        SELECT id, name as "authorName" 
        FROM authors
        WHERE name = $1;
        `,
		[authorName],
	);
	return rows[0];
};

// POST /authors/
const insertAuthor = async (authorName) => {
	const { rows } = await pool.query(
		`
        INSERT INTO authors (name)
        VALUES ($1) RETURNING id, name as "authorName";
        `,
		[authorName],
	);
	return rows[0];
};

const insertAuthorOfBook = async ({ bookId, authorId }) => {
	const { rows } = await pool.query(
		`
        INSERT INTO book_authors (book_id, author_id)
        VALUES ($1, $2) RETURNING book_id as "bookId", author_id as "authorId";
        `,
		[bookId, authorId],
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
        RETURNING id, name as "authorName";
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
        RETURNING id, name as "authorName";
        `,
		[authorId],
	);
	return rows[0];
};

module.exports = {
	getAllAuthors,
	getAuthorById,
	getAuthorByName,
	insertAuthor,
	insertAuthorOfBook,
	updateAuthor,
	deleteAuthor,
};
