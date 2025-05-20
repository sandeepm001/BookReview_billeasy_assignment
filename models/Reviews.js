const mongoose = require('mongoose')

const ReviewSchema  = new mongoose.Schema({

    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        reqired: true 
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        reqired: true 
    },
    rating:  {
        type: Number,
        min: 1,max: 5,
        require: true
    },
    comment: String
    
},{timestamps:true})


module.exports = mongoose.model("Review",ReviewSchema);