const express = require('express');
const router = express.Router();
const discussionController = require('../controllers/discussionController');

router.post('/', discussionController.createDiscussion);
router.put('/:discussionId', discussionController.updateDiscussion);
router.delete('/:discussionId', discussionController.deleteDiscussion);
router.get('/tags/:tag', discussionController.getDiscussionsByTag);
router.get('/search', discussionController.searchDiscussionsByText);



module.exports = router;
