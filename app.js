const express = require("express");
const path = require("node:path");
const app = express();

const indexRouter = require("./routes/indexRouter");

const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}\nProcess: ${process.pid}`);
});

app.on("error", (err) => {
	console.error(err);
	process.exit(1);
});
