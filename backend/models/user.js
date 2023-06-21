const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{type:String,required:true},
    email: {
        type: String,
        required: true,
        unique: true
    },
    
    //Boolean used to verify if a user is an admin.
    verified:{
        type:Boolean,
        default:false

    },
    password: { type: String, required: true },
    Reviews:[{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],

    
    Dorms:[{
        type: Schema.Types.ObjectId,
        ref: 'Dorm'
    }]

});


module.exports = mongoose.model('User', UserSchema);