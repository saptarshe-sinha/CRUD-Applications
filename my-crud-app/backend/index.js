require('dotenv').config();
const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');  
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const data = require("./Operations");

app.use(cors());

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err.message);
  });


app.use('/api/data', data);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;