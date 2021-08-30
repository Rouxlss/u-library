const { Router } = require('express');
const router = Router();

const { getBooks, createBook, updateBook, deleteBook, getBook, getBooksBySearch }
    = require('./../controllers/books.controller');

router.route('/')
    .get(getBooks)
    .post(createBook)


router.route('/search/:search')
    .get(getBooksBySearch)

router.route('/:id')
    .get(getBook)
    .put(updateBook)
    .delete(deleteBook)


module.exports = router;