const { Router } = require("express");
const indexRouter = Router();

// Catch endpoints and call controllers

indexRouter.get("/", (req, res) => {
	res.render("index", {
		title: "Inventory App",
		heading: "Book Inventory App",
	});
});

module.exports = indexRouter;
