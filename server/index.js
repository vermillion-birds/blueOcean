require("dotenv").config();
const express = require("express");
const util = require('node:util');
const app = express();
const path = require("path");
const cors = require("cors");
const pool = require("../database/db.js");
const { getBirdNames, postBird } = require("./controllers/birds.js")



// middlewar e
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "../public")));
app.use(cors());

app.get('/birds', getBirdNames);

const PORT = process.env.PORT || 3001;

app.post('/birds', postBird)

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})