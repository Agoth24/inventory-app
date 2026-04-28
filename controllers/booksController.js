const bookDB = require("../db/bookQueries");
const genreDB = require("../db/genreQueries");
const authorDB = require("../db/authorQueries");

// Returns an array of book objects
const getBooks = async (req, res) => {
	const books = await bookDB.getAllBooks();

	if (books.length === 0) {
		return res.status(200).json({ message: "No books exist" });
	}

	res.status(200).json(books);
};

// Returns a book object
const getBook = async (req, res) => {
	const book = await bookDB.getBookById(req.params.id);

	if (!book) {
		return res.status(404).json({ message: "Book not found" });
	}

	res.status(200).json(book);
};

// Creates a book in the book table and related tables
const createBook = async (req, res) => {
	const { title, genreName, authorName } = req.body || {};

	// Not possible to create book
	if (!title || !genreName) {
		return res.status(400).json({ message: "Error: missing fields" });
	}

	let genreId = await genreDB.getGenreIdByName(genreName);

	if (!genreId) {
		// Add the genre to the db
		genreId = await genreDB.insertGenre(genreName);
	}

	const insertedBookId = await bookDB.insertBook({
		title: title,
		genreId: genreId,
	});

	if (!insertedBookId) {
		return res.status(500).json({ message: "Cannot create book" });
	}

	// Add a row to the book_authors table
	if (authorName) {
		let authorId = await authorDB.getAuthorIdByName(authorName);

		if (!authorId) {
			authorId = await authorDB.insertAuthor(authorName);
		}

		await authorDB.insertAuthorOfBook({
			bookId: insertedBookId,
			authorId: authorId,
		});
	}

	res.status(201).json({ message: "Successfully created book" });
};

// Updates a book's title and genre ID
const updateBook = async (req, res) => {
	const { id } = req.params;
	const { title, genreName } = req.body || {};

    if (!(await bookDB.getBookById(id))) {
        return res.status(404).json({ message: "Book doesn't exist" });
    }

	if (!title || !genreName) {
		return res.status(400).json({ message: "Error: missing fields" });
	}

	let genreId = await genreDB.getGenreIdByName(genreName);

	if (!genreId) {
		genreId = await genreDB.insertGenre(genreName);
	}

	const result = await bookDB.updateBook(id, {
		title: title,
		genreId: genreId,
	});

	if (!result) {
		return res.status(404).json({ message: "Cannot update book" });
	}

	res.status(200).json({ message: "Successfully updated book" });
};

// Removes a book from the book table
const deleteBook = async (req, res) => {
	const { id } = req.params;
    
    if (!(await bookDB.getBookById(id))) {
        return res.status(404).json({ message: "Book doesn't exist" });
    }
    
    const result = await bookDB.deleteBook(id);

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
