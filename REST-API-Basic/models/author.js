const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Book = require('./book');
const authorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
    },
    books: [{
        type: mongoose.Types.ObjectId,
        ref: "Book"
    }]
}, {
    timestamps: true,
})
const Author = mongoose.model("Author", authorSchema);
module.exports = Author;