const express = require("express");
// const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// const morgan = require("morgan");
const routes = require("./routes/index.js");
const cors = require("cors");

require("./db");
const app = express();
app.use(
	cors({
		credentials: true,
		origin: [
			"http://localhost:3000", //le doy permiso a esta ruta para hacer peticiones (front)
		],
	})
);

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
// app.use(cookieParser());
// app.use(morgan("dev"));
app.use((req, res, next) => {
	const corsWhitelist = [
		"http://localhost:3000",
	];

	if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
		res.header("Access-Control-Allow-Origin", req.headers.origin); // Front-End all url "*"
		res.header("Access-Control-Allow-Credentials", "true");
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept"
		);
		res.header("Access-Control-Expose-Headers", "X-Powered-By");
		res.header(
			"Access-Control-Allow-Methods",
			"GET, POST, OPTIONS, PUT, DELETE"
		);
	}

	next();
});


//middleware to apply all the possible routes in server
app.use("/", routes);

// Error catching endware.
app.use((err, req, res, next) => {
	// eslint-disable-line no-unused-vars
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

module.exports = app;