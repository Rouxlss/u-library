const booksCtrl = {};

const Book = require('../models/Book');

booksCtrl.getBooks = async (req, res) => {
    const books = await Book.find();
    res.json(books)
};

booksCtrl.createBook = async (req, res) => {
    const {title, author, year, genre} = req.body;
    const newBook = new Book({title, author, year, genre})
    await newBook.save();
    res.json({message: 'Book Saved'})
};

booksCtrl.getBook = async (req, res) => {
    const id = req.params.id;
    const book = await Book.findById(id);
    res.json(book)
};

booksCtrl.deleteBook = async (req, res) => {
    const id = req.params.id;
    await Book.findByIdAndDelete(id)
    res.json({message: 'Book Deleted'})
};

booksCtrl.updateBook = async (req, res) => {
    const id = req.params.id;
    const {title, author, year, genre} = req.body;
    await Book.findByIdAndUpdate(id, {title, author, year, genre})
    res.json({message: 'Book Updated'})
};

module.exports = booksCtrl;