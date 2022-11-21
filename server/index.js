require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

// middlewar e
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "../public")));
app.use(cors());


app.get('/bird',(req,res)=>{
  console.log('from server')
  res.send('this works!')
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})