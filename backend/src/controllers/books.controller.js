const booksCtrl = {};

const Book = require('../models/Book');

booksCtrl.getBooks = async (req, res) => {
    const books = await Book.find();
    res.json(books)
};

booksCtrl.createBook = async (req, res) => {
    const { title, author, year, genre, stock } = req.body;
    const newBook = new Book({ title, author, year, genre, stock })
    await newBook.save();
    res.json({ message: 'Book Saved' })
};

booksCtrl.getBook = async (req, res) => {
    const id = req.params.id;
    const book = await Book.findById(id);
    res.json(book)
};

booksCtrl.deleteBook = async (req, res) => {
    const id = req.params.id;
    await Book.findByIdAndDelete(id)
    res.json({ message: 'Book Deleted' })
};

booksCtrl.updateBook = async (req, res) => {
    const id = req.params.id;
    const { title, author, year, genre, stock } = req.body;
    await Book.findByIdAndUpdate(id, { title, author, year, genre, stock })
    res.json({ message: 'Book Updated' })
};

booksCtrl.getBooksBySearch = async (req, res) => {
    let regex = new RegExp(req.params.search, 'i');
    Book.find(
        { $or: [
            { title: regex }, 
            { author: regex },
            { genre: regex }
        ] },
        function (err, books) {
            res.json(books);
        }
    )
};

module.exports = booksCtrl;