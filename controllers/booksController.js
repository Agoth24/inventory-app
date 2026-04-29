const bookDB = require("../db/bookQueries");
const genreDB = require("../db/genreQueries");
const authorDB = require("../db/authorQueries");

// Returns an array of book objects
const getBooks = async (req, res) => {
	const books = await bookDB.getAllBooks();

	if (books.length === 0) {
		return res.status(200).json([]);
	}

	res.status(200).json(books);
};

// Returns a book object
const getBook = async (req, res) => {
	const book = await bookDB.getBookById(req.params.id);

	if (!book) {
		return res.status(404).json({});
	}

	res.status(200).json(book);
};

// Creates a book in the book table and related tables
const createBook = async (req, res) => {
	const { title, genreName, authorName } = req.body;

	let genre = await genreDB.getGenreByName(genreName);

	if (!genre) {
		// Add the genre to the db
		genre = await genreDB.insertGenre(genreName);
	}

	let insertedBook = await bookDB.insertBook({
		title: title,
		genreId: genre.id,
	});

	if (!insertedBook) {
		return res.status(500).json({});
	}

	// Add a row to the book_authors table
	if (authorName) {
		let author = await authorDB.getAuthorByName(authorName);

		if (!author) {
			author = await authorDB.insertAuthor(authorName);
		}

		await authorDB.insertAuthorOfBook({
			bookId: insertedBook.id,
			authorId: author.id,
		});
	}

	insertedBook = await bookDB.getBookById(insertedBook.id);

	res.status(201).json(insertedBook);
};

// Updates a book's title and genre ID
const updateBook = async (req, res) => {
	const { id } = req.params;
	const { title, genreName } = req.body;

	if (!(await bookDB.getBookById(id))) {
		return res.status(404).json({});
	}

	let genre = await genreDB.getGenreByName(genreName);

	if (!genre) {
		genre = await genreDB.insertGenre(genreName);
	}

	let updatedBook = await bookDB.updateBook(id, {
		title: title,
		genreId: genre.id,
	});

	if (!updatedBook) {
		return res.status(500).json({});
	}

	updatedBook = await bookDB.getBookById(updatedBook.id);

	res.status(200).json(updatedBook);
};

// Removes a book from the book table
const deleteBook = async (req, res) => {
	const { id } = req.params;

	const book = await bookDB.getBookById(id);
    
	if (!book) {
		return res.status(404).json({});
	}

	const deletedBook = await bookDB.deleteBook(id);

	if (!deletedBook) {
		return res.status(500).json({});
	}

	res.status(200).json(book);
};

module.exports = {
	getBooks,
	getBook,
	createBook,
	updateBook,
	deleteBook,
};
