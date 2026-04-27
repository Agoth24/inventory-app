const pool = require("./pool");

// GET /authors
const getAllAuthors = async () => {
	const { rows } = await pool.query(`

        `);
	return rows;
};

// GET /authors/:id
const getAuthorById = async ({ authorId }) => {
	const { rows } = await pool.query(`
        
        `);

	return rows[0];
};

// POST /authors/
const insertAuthor = async ({ authorName }) => {
	const { rows } = await pool.query(`
        
        `);
	return rows[0];
};
// PUT /authors/:id
const updateAuthor = async (authorId, { authorName }) => {
	const { rows } = await pool.query(`
            
        `);
	return rows[0];
};

// DELETE /authors/:id
const deleteAuthor = async ({ authorId }) => {
	const { rows } = await pool.query(`
        
        `);
	return rows[0];
};

module.exports = {
	getAllAuthors,
	getAuthorById,
	insertAuthor,
	updateAuthor,
	deleteAuthor,
};
