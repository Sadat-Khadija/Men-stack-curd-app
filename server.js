const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Book = require('./models/book.js');


app.get('/', async(req, res) => {
  res.render('index.ejs');
});


app.get("/books/new", (req, res) => {
    res.render("books/new.ejs");
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

