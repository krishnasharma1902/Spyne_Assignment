const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

router.post('/:discussionId', viewController.incrementViewCount);
router.get('/:discussionId', viewController.getViewCount);

module.exports = router;
