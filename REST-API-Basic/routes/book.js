const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
router.get('/', bookController.getAllBooks);
router.post('/', bookController.addABook);
router.get('/:id', bookController.getABook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);
module.exports = router;