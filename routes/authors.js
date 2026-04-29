const { Router } = require("express");
const authorController = require("../controllers/authorsController");
const validate = require("../validators/validate");
const {
	authorBodySchema,
	authorIdSchema,
} = require("../validators/authorSchema");

const authorRouter = Router();

authorRouter.get(
	"/:id",
	validate(authorIdSchema, { target: "params" }),
	authorController.getAuthor,
);
authorRouter.get("/", authorController.getAuthors);

authorRouter.post(
	"/",
	validate(authorBodySchema, { target: "body" }),
	authorController.createAuthor,
);

authorRouter.put(
	"/:id",
	validate(authorIdSchema, { target: "params" }),
	validate(authorBodySchema, { target: "body" }),
	authorController.updateAuthor,
);

authorRouter.delete(
	"/:id",
	validate(authorIdSchema, { target: "params" }),
	authorController.deleteAuthor,
);

module.exports = authorRouter;
