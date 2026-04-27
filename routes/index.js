const { Router } = require("express");
const indexRouter = Router();


indexRouter.get("/", (req, res) => {
    res.json({message: "Home Page"})
	// res.render("index", {
	// 	title: "Inventory App",
	// 	heading: "Book Inventory App",
	// });
});

module.exports = indexRouter;
