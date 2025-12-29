const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: String,
    isReadyToRead: Boolean
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;