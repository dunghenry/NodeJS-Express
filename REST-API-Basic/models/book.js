const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Author = require('./author');
const bookSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    publishedDay: {
        type: String,
    },
    genres: {
        type: [String]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    }
}, {
    timestamps: true,
})

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;