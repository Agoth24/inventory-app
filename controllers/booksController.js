const bookDB = require("../db/bookQueries");

const getBooks = async (req, res) => {
	const books = await bookDB.getAllBooks();
	if (books.length === 0) {
		return res.status(200).json({ message: "No books exist" });
	}
	res.status(200).json(books);
};

const getBook = async (req, res) => {
	const book = await bookDB.getBookById(req.params.id);
	if (!book) {
		return res.status(404).json({ message: "Book not found" });
	}
	res.status(200).json(book);
};

const createBook = async (req, res) => {
	const { title, genre } = req.body;
	const result = await bookDB.insertBook({ title: title, genreName: genre });
	if (!result) {
		return res.status(500).json({ message: "Cannot create book" });
	}
	res.status(201).json({ message: "Successfully created book" });
};

const updateBook = async (req, res) => {
	const { id } = req.params;
	const { title, genre } = req.body;
	const result = await bookDB.updateBook(id, {
		title: title,
		genreName: genre,
	});
	if (!result) {
		return res.status(404).json({ message: "Cannot update book" });
	}
	res.status(200).json({ message: "Successfully updated book" });
};

const deleteBook = async (req, res) => {
	const { id } = req.params;
	const result = await bookDB.deleteBook({ bookId: id });
	if (!result) {
		return res.status(400).json({ message: "Cannot delete book" });
	}
	res.status(200).json({ message: "Successfully deleted book" });
};

module.exports = {
	getBooks,
	getBook,
	createBook,
	updateBook,
	deleteBook,
};
