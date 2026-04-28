const { Router } = require("express");
const authorController = require("../controllers/authorsController")

const authorRouter = Router();


authorRouter.get("/:id", authorController.getAuthor);
authorRouter.get("/", authorController.getAuthors);

authorRouter.post("/", authorController.createAuthor);
authorRouter.put("/:id", authorController.updateAuthor);

authorRouter.delete("/:id", authorController.deleteAuthor);

module.exports = authorRouter;
