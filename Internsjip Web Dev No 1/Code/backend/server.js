const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const cors = require("cors");
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(express.json());
app.use(cors());
require("dotenv").config({ path: "./config.env" });

const DB = require("./db/conn");
app.use(require("./router/auth"));
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
