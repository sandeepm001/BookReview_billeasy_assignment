const express = require('express');
const { getAllBooks, addBook ,getBookById, searchBooks } = require('../Controllers/BookController');
const {verifyToken} = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/addbook', verifyToken, addBook);
router.get('/getAllBooks', getAllBooks); // public route
router.get('/getBook/:id',getBookById);
router.get('/searchBook' ,searchBooks);

module.exports = router;
