const { Router } = require("express");

const router = Router();

// Catch endpoints and call controllers



router.post("/", (req, res) => {
    res.send(`POST request to ${req.url}`)
})

router.get("/", (req, res) => {
	res.render("index", {title: "Inventory App", heading: "Home"});
});

module.exports = router;
