const pool = require("./pool");

// GET /books
const getAllBooks = async () => {
	const { rows } = await pool.query(`
        SELECT * FROM books;
        `);
	return rows;
};

// GET /books/:id
const getBookById = async (bookId) => {
	const { rows } = await pool.query(
		`
        SELECT * FROM books
        WHERE id = $1;
        `,
		[bookId],
	);

	return rows[0];
};

// POST /books/
const insertBook = async ({ title, genreId }) => {
	const { rows } = await pool.query(
		`
        INSERT INTO books (title, genre_id) 
        VALUES ($1, $2) RETURNING *;
        `,
		[title, genreId],
	);
	// TODO: add constraint for no exact duplicates
	return rows[0];
};

// PUT /books/:id
const updateBook = async (bookId, { title, genreId }) => {
	const { rows } = await pool.query(
		`
        UPDATE books
        SET title = $1,
            genre_id = $2
        WHERE id = $3
        RETURNING *;
        `,
		[title, genreId, bookId],
	);
	return rows[0];
};

// DELETE /books/:id
const deleteBook = async (bookId) => {
	const { rows } = await pool.query(
		`
        DELETE FROM books
        WHERE id = $1
        RETURNING *;
        `,
		[bookId],
	);
	return rows[0];
};

module.exports = {
	getAllBooks,
	getBookById,
	insertBook,
	updateBook,
	deleteBook,
};
