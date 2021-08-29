const { Router } = require('express');
const router = Router();

const {getBooks, createBook, updateBook, deleteBook, getBook} 
= require('./../controllers/books.controller');

router.route('/')
    .get(getBooks)
    .post(createBook)
 
router.route('/:id')
    .get(getBook)
    .put(updateBook)
    .delete(deleteBook)


module.exports = router;