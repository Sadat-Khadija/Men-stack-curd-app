const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

dotenv.config();

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Book = require('./models/book.js');

app.get('/', async(req, res) => {
  res.render('index.ejs');
});

//get route to show all books
app.get("/books", async(req, res) => {
    const allBooks = await Book.find();
     res.render("books/index.ejs", { books: allBooks });
});

//get route to show form to create a new book
app.get("/books/new", (req, res) => {
    res.render("books/new.ejs");
});

//get route to show a single book
app.get("/books/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render("books/show.ejs", { book });
});

//get route to edit a single book
app.get("/books/:id/edit", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render("books/edit.ejs", { book });
});

//post route to create a new book
app.post ("/books", async (req, res) => {
    req.body.isReadyToRead = req.body.isReadyToRead === 'on';
    await Book.create(req.body);
    res.redirect("/books");
});

//put route to update a book
app.put("/books/:id", async (req, res) => {
  req.body.isReadyToRead = req.body.isReadyToRead === 'on';
  await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.redirect(`/books/${req.params.id}`);
});

//delete route to delete a book
app.delete("/books/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.redirect("/books");
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
