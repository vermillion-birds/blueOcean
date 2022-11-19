require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const pool = require("../database/db.js")
const {getBirdNames} = require("./controllers/birds.js")

// database
const db = require('../db')

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "../public")));
app.use(cors());


app.get('/birds',getBirdNames);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})