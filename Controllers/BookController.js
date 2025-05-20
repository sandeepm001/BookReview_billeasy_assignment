const Book = require('../models/Book');
const Reviews = require('../models/Reviews');
const mongoose = require('mongoose');

const addBook = async (req, res, next) => {
    try {
        const newBook = new Book({
        ...req.body,
        addedBy: req.user.id,
        });

        const savedBook = await newBook.save();
        res.status(201).json({ message: "Book is inserted", book: savedBook });
    } catch (err) {
        next(err);
    }
};


const getAllBooks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;

    const filter = {};
	//case in sensitive search also partial search
    if (author) filter.author = new RegExp(author, 'i'); 
    if (genre) filter.genre = new RegExp(genre, 'i');

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Book.countDocuments(filter);

    res.status(200).json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      books
    });
  } catch (err) {
    next(err);
  }
};


const getBookById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { page = 1, limit = 5 } = req.query;

		//get book by ID
		const book = await Book.findById(id);
		if (!book) return res.status(404).json({ message: 'Book not found' });

		//get all reviews for that book
		const reviews = await Reviews.find({ book: id })
			.skip((page - 1) * limit)
			.limit(parseInt(limit))
			.sort({ createdAt: -1 });

		const totalReviews = await Reviews.countDocuments({ book: id });

		//average rating
		const avgResult = await Reviews.aggregate([
			{ $match: { book: new mongoose.Types.ObjectId(id) } },
			{ $group: { _id: '$book', averageRating: { $avg: '$rating' } } }
		]);

		const averageRating = avgResult[0]?.averageRating?.toFixed(1) || null;

		res.status(200).json({
			book,
			averageRating,
			totalReviews,
			currentPage: parseInt(page),
			reviews
		});
	} catch (err) {
		next(err);
	}
};


const searchBooks = async (req, res, next) => {
	try {
		const { query } = req.query;

		if (!query) {
			return res.status(400).json({ message: 'Search query is required' });
		}
		//check the query if is in title or author
		const filter = {
			$or: [
				{ title: { $regex: query, $options: 'i' } },
				{ author: { $regex: query, $options: 'i' } }
			]
		};

		const books = await Book.find(filter);
		res.status(200).json(books);
	} catch (err) {
		next(err);
	}
};



module.exports = { addBook, getAllBooks ,getBookById ,searchBooks};

