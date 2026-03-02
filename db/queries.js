const pool = require('./pool')

const findAllBooks = async () => {
    const {rows} = await pool.query(`

        `)
        return rows;
}

const insertBook = async ({title, author, genre}) => {
    await pool.query(`
        
        `)
}

const findAllBooksByGenre = async (genre) => {
    const {rows} = await pool.query(`
        
        `);
    return rows;
}

const deleteBookById = async (bookId) => {
    await pool.query(`
        
        `);
}

module.exports = {
    findAllBooks,
    insertBook,
    findAllBooksByGenre,
    deleteBookById
}