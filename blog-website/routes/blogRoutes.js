const express = require('express');
const blogController = require('../controllers/blogController');

// create new express router
const router = express.Router(); // new instance of router object

router.get('/', blogController.blog_index);
router.get('/create', blogController.blog_create_get);
router.post('/', blogController.blog_create_post);
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.blog_delete);

module.exports = router; // export router