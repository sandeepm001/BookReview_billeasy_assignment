const Reviews = require('../models/Reviews.js');
const Book = require('../models/Book');

const addReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const bookId = req.params.id;
    const userId = req.user.id;

    // check if the book exists
    const bookExists = await Book.findById(bookId);
    if (!bookExists) return res.status(404).json({ message: 'Book not found' });

    // check if user already reviewed this book
    const existingReview = await Reviews.findOne({ book: bookId, user: userId });
    if (existingReview) return res.status(400).json({ message: 'You have already reviewed this book' });

    const review = new Reviews({
      book: bookId,
      user: userId,
      rating,
      comment
    });

    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (err) {
    next(err);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id; // from verifyToken middleware

    const review = await Reviews.findById({_id:id});
    if (!review) return res.status(404).json({ message: "Review not found" });

    //check if review belongs to the user
    if (review.user.toString() !== userId) 
      return res.status(403).json({ message: "Unauthorized to update this review" });

    //update fields if provided
    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await review.save();
    res.status(200).json({ message: "Review updated", review });
  } catch (err) {
    next(err);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const review = await Reviews.findById(id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // only the user who had review can acess and delete the review
    if (review.user.toString() !== userId)
      return res.status(403).json({ message: "Unauthorized to delete this review" });

    await Reviews.findByIdAndDelete(id);
    res.status(200).json({ message: "Review deleted" });
  } catch (err) {
    next(err);
  }
};



module.exports = {addReview , updateReview,deleteReview}
