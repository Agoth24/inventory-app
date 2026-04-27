const { Router } = require("express");
const bookController = require("../controllers/booksController");

const bookRouter = Router();


bookRouter.post("/", (req, res) => {
	res.send(`POST request to ${req.url}`);
    res.render("books", {})
});

bookRouter.get("/", (req, res) => {
	const { books } = bookController.getAllBooks();
	res.render("books", {
		title: "Inventory App",
		heading: "All Books",
		books: books,
	});
});

module.exports = bookRouter;