const db = require("../db/queries");

const getAllBooks = async () => {
    return await db.findAllBooks();
};

const createBook = async ({ title, author, genre }) => {
    await db.insertBook({title, author, genre});
};

const getBooksByGenre = async (genre) => {
    return await db.findAllBooksByGenre(genre);
};

const deleteBook = async (bookId) => {
    await db.deleteBookById(bookId);
};

module.exports = {
	getAllBooks,
	createBook,
	getBooksByGenre,
	deleteBook,
};
