const pool = require("./pool");

// GET /books
const getAllBooks = async () => {
	const { rows } = await pool.query(`

        `);
	return rows;
};

// GET /books/:id
const getBookById = async ({ bookId }) => {
	const { rows } = await pool.query(`
        
        `);

	return rows[0];
};

// POST /books/
const insertBook = async ({ title }) => {
	const { rows } = await pool.query(`
        
        `);
	return rows[0];
};

// PUT /books/:id
const updateBook = async (bookId, { title, genreName}) => {
	const { rows } = await pool.query(`
            
        `);
	return rows[0];
};

// DELETE /books/:id
const deleteBook = async ({ bookId }) => {
	const { rows } = await pool.query(`
        
        `);
	return rows[0];
};

module.exports = {
	getAllBooks,
	getBookById,
	insertBook,
	updateBook,
	deleteBook,
};
