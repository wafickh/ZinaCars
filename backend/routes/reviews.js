const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const { createReview, deleteReview, updatereview, getAllReviews } = require("../controllers/reviews.js")

//AddReview
router.post('/', auth, createReview)

//DeleteReview
router.delete('/:dormid/:userid/:reviewid', deleteReview)

router.put('/:id/:dormid', updatereview)

router.get('/',getAllReviews)

module.exports = router;

