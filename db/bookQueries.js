const pool = require("./pool");

// GET /books
const getAllBooks = async () => {
	const { rows } = await pool.query(`
        SELECT 
            b.id, 
            b.title,
            g.id AS "genreId",
            g.name as "genreName"
        FROM books b
        JOIN genres g on b.genre_id = g.id;
        `);
	return rows;
};

// GET /books/:id
const getBookById = async (bookId) => {
	const { rows } = await pool.query(
		`
        SELECT 
            b.id, 
            b.title,
            g.id AS "genreId",
            g.name as "genreName"
        FROM books b
        JOIN genres g on b.genre_id = g.id
        WHERE b.id = $1;
        `,
		[bookId],
	);

	return rows[0];
};

const getBookByName = async (title) => {
	const { rows } = await pool.query(
		`
        SELECT 
            b.id, 
            b.title,
            g.id AS "genreId",
            g.name as "genreName"
        FROM books b
        JOIN genres g on b.genre_id = g.id
        WHERE b.title = $1;
            `,
		[title],
	);
	return rows[0];
};

// POST /books/
const insertBook = async ({ title, genreId }) => {
	const { rows } = await pool.query(
		`
        INSERT INTO books (title, genre_id) 
        VALUES ($1, $2) RETURNING id, title, genre_id as "genreId";
        `,
		[title, genreId],
	);
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
        RETURNING id, title, genre_id as "genreId";
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
        RETURNING id, title, genre_id as "genreId";
        `,
		[bookId],
	);
	return rows[0];
};

module.exports = {
	getAllBooks,
	getBookById,
	getBookByName,
	insertBook,
	updateBook,
	deleteBook,
};
