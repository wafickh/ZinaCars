const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const CarSchema = new Schema({

    Name: { type: String, required: true },
    Color: { type: String, required: true },
    Price: { type: String, required: true },
    Condition: { type: String },
    Year: { type: String, required: true },
    images: [{

        type: Object,
        required: true
    }],
    Cylinders: { type: String, required: true },




});



module.exports = mongoose.model('Car', CarSchema);