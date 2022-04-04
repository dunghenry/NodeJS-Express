const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
router.get('/', authorController.getAllAuthors);
router.post('/', authorController.addAuthor);
router.get('/:id', authorController.getAnAuthor);
router.put('/:id', authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);
module.exports = router;