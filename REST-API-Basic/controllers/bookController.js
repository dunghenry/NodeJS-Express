const Book = require('../models/book');
const Author = require('../models/author');
const bookController = {
    addABook: async (req, res) => {
        try {
            const book = new Book(req.body);
            const savedBook = await book.save();
            if (req.body.author) {
                //!C1
                // const author = await Author.find({ _id: req.body.author });
                //!C2
                const author = await Author.findById(req.body.author);
                await author.updateOne({ $push: { books: savedBook._id } });
            }
            return res.status(200).json(savedBook);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    getAllBooks: async (req, res) => {
        try {
            const allBooks = await Book.find();
            return res.status(200).json(allBooks);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    getABook: async (req, res) => {
        try {
            const id = req.params.id;
            const book = await Book.findById(id).populate("author");
            return res.status(200).json(book);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    updateBook: async (req, res) => {
        try {
            const id = req.params.id;
            const book = await Book.findById(id);
            await Book.updateOne({$set: req.body});
            return res.status(200).json("Updated book successfully!!!");
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    deleteBook: async (req, res) => {
        try {
            const id = req.params.id;
            await Author.updateMany({ books: id }, {$pull: {books: id} });
            await Book.findByIdAndDelete(id);
            return res.status(200).json("Deleted book successfully!!!");
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}
module.exports = bookController;