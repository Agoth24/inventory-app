const { Router } = require("express");
const bookController = require("../controllers/booksController");

const bookRouter = Router();

bookRouter.post("/", (req, res) => {
	res.send(`POST request to ${req.url}`);
});

bookRouter.get("/:id", bookController.getBook);
bookRouter.get("/", bookController.getBooks);

module.exports = bookRouter;
