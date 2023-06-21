const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    approved: {
        type: Boolean,
        default: false
    },
    Rating: {
        type: Number,
        default: 0,
    },
    Review: {
        type: String,
        required: true
    },
    Dorm: {
        type: Schema.Types.ObjectId,
        ref: 'Dorm'
    },
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    , createdAt: {
        type: Date,
        default: new Date()
    }
});



module.exports = mongoose.model('Review', ReviewSchema);