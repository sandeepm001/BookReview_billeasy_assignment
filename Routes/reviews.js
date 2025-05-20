const express = require('express');
const { addReview ,updateReview,deleteReview} = require('../Controllers/ReviewController');
const {verifyToken} = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/addreview/:id/reviews', verifyToken, addReview);
router.put('/updatereview/:id', verifyToken, updateReview);
router.delete('/deletereview/:id', verifyToken, deleteReview);

module.exports = router;