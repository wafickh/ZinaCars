const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const CarSchema = new Schema({

    Name: { type: String, required: true },
    Color: { type: String },
    Price: { type: String, required: true },
    Year: { type: String, required: true },
    images: [{

        type: Object,
        required: true
    }],



});



module.exports = mongoose.model('Car', CarSchema);
