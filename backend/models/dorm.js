const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const DormSchema = new Schema({
    approved: {
        type: Boolean,
        default: false
    },
    Name: {type:String,required:true},
    contractInformation: {
        Deposit: String,
        Price:  {type:String,required:true},
        ContractLength: String,
        DormType:{type: [String],required:true},
        Amenities: [String],
        AdditionalInfo: String
    },
    Rating: {
        type: Number,
        default: 0
    },
    images: {
        type: Object,
        required:true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    ContactUs:
        {type:String,required:true},
    
    Coordinates: {
        lag: {
            type: Number, required: true},
        long: {
            type: Number, required: true }
    },
    Reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    Author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    Schools: [{
        type: Schema.Types.ObjectId,
        ref: 'School'
    }]
});



module.exports = mongoose.model('Dorm', DormSchema);