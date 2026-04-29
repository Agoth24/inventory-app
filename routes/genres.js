const { Router } = require("express");
const genresController = require("../controllers/genresController");
const validate = require("../validators/validate");
const { genreBodySchema, genreIdSchema } = require("../validators/genreSchema");

const genresRouter = Router();

genresRouter.get(
	"/:id",
	validate(genreIdSchema, { target: "params" }),
	genresController.getGenre,
);
genresRouter.get("/", genresController.getGenres);

genresRouter.post(
	"/",
	validate(genreBodySchema, { target: "body" }),
	genresController.createGenre,
);

genresRouter.put(
	"/:id",
	validate(genreIdSchema, { target: "params" }),
	validate(genreBodySchema, { target: "body" }),
	genresController.updateGenre,
);

genresRouter.delete(
	"/:id",
	validate(genreIdSchema, { target: "params" }),
	genresController.deleteGenre,
);

module.exports = genresRouter;
