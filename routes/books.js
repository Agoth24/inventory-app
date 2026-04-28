const { Router } = require("express");
const bookController = require("../controllers/booksController");

const bookRouter = Router();

bookRouter.get("/:id", bookController.getBook);
bookRouter.get("/", bookController.getBooks);

bookRouter.post("/", bookController.createBook);
bookRouter.put("/:id", bookController.updateBook);

bookRouter.delete("/:id", bookController.deleteBook);

module.exports = bookRouter;
