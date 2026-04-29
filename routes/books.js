const { Router } = require("express");
const bookController = require("../controllers/booksController");
const validate = require("../validators/validate");
const { bookBodySchema, bookIdSchema } = require("../validators/bookSchema");

const bookRouter = Router();

bookRouter.get(
	"/:id",
	validate(bookIdSchema, { target: "params" }),
	bookController.getBook,
);

bookRouter.get("/", bookController.getBooks);

bookRouter.post(
	"/",
	validate(bookBodySchema, { target: "body" }),
	bookController.createBook,
);
bookRouter.put(
	"/:id",
	validate(bookIdSchema, { target: "params" }),
	validate(bookBodySchema, { target: "body" }),
	bookController.updateBook,
);

bookRouter.delete(
	"/:id",
	validate(bookIdSchema, { target: "params" }),
	bookController.deleteBook,
);

module.exports = bookRouter;
