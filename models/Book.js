const mongoose = require('mongoose')

const BookSchema  = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    author: {
        type: String,
        required: true
    },
    genre: String,
    description: String,
    addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},{timestamps:true})

//ensures only one pair of title and author will be in a database book(doest allow duplicates)
BookSchema.index({ title: 1, author: 1 }, { unique: true }); 

module.exports = mongoose.model("Book",BookSchema);