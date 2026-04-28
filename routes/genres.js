const { Router } = require("express")
const genresController = require("../controllers/genresController")

const genresRouter = Router();


genresRouter.get("/:id", genresController.getGenre);
genresRouter.get("/", genresController.getGenres);

genresRouter.post("/", genresController.createGenre);
genresRouter.put("/:id", genresController.updateGenre);

genresRouter.delete("/:id", genresController.deleteGenre);


module.exports = genresRouter;