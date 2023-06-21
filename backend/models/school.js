const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SchoolSchema = new Schema({
    Name: String,
    Image: String,
    Coordinates: {
        lag: { type: Number },
        long: { type: Number }
    },
    City: String,
    Dorms: [{
        type: Schema.Types.ObjectId,
        ref: 'Dorm'
    }]
});


module.exports = mongoose.model('School', SchoolSchema);