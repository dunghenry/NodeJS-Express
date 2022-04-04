const Author = require('../models/author');
const Book = require('../models/book');
const authorController = {
    addAuthor: async (req, res) => {
        try {
            const author = new Author(req.body);
            const savedAuthor = await author.save();
            return res.status(200).json(savedAuthor);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    getAllAuthors: async (req, res) => {
        try {
            const authors = await Author.find();
            return res.status(200).json(authors);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    getAnAuthor: async (req, res) => {
        try {
            const id = req.params.id;
            const author = await Author.findById(id).populate('books');
            return res.status(200).json(author);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    updateAuthor: async (req, res) => {
        try {
            const id = req.params.id;
            const author = await Author.findById(id);
            await author.updateOne({ $set: req.body });
            return res.status(200).json("Updated author successfully!!!");
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    deleteAuthor: async (req, res) => {
        try {
            const id = req.params.id;
            await Book.updateMany({ author: id }, { author: null });
            await Author.findByIdAndDelete(id);
            return res.status(200).json("Deleted author successfully!!!");
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}
module.exports = authorController;