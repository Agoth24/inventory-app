const { Router } = require("express");
const indexRouter = Router();

indexRouter.get("/", (req, res) => {
	res.json({ message: "Home Page" });
});

module.exports = indexRouter;
