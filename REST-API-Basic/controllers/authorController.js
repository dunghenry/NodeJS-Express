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

}

module.exports = authorController;