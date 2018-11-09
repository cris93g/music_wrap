require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const session = require("express-session");

const app = express();
const port = process.env.port || 3001;
app.use(cors());
app.use(json());

//connects to db
massive(process.env.CONNECTION_STRING).then(dbinstance => {
	app.set("db", dbinstance);
});
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 10000
		}
	})
);

app.listen(port, () => {
	console.log(`app is listening on port ${port}`);
});
