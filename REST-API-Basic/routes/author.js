const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
router.get('/', authorController.getAllAuthors);
router.post('/', authorController.addAuthor);

module.exports = router;