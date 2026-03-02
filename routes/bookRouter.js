const { Router } = require("express");
const bookController = require("../controllers/booksController");

const bookRouter = Router();


bookRouter.post("/", (req, res) => {
	res.send(`POST request to ${req.url}`);
});

bookRouter.get("/", (req, res) => {
	const { books } = bookController.getAllBooks();
	res.render("index", {
		title: "Inventory App",
		heading: "All Books",
		books: books,
	});
});

module.exports = bookRouter;