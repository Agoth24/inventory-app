const express = require("express");
const indexRouter = require("./routes/indexRouter");
const bookRouter = require("./routes/bookRouter");
const path = require("node:path");

const app = express();

const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "public");

// static file serving, view engines and middleware
app.use(express.static(publicPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

/* ROUTES */
app.use("/books", bookRouter);
app.use("/", indexRouter);

/* LISTENING */ 
app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Listening on port ${PORT}\nProcess: ${process.pid}`);
});
