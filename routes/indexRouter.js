const { Router } = require("express");
const indexRouter = Router();


indexRouter.get("/", (req, res) => {
	res.render("index", {
		title: "Inventory App",
		heading: "Book Inventory App",
	});
});

module.exports = indexRouter;
