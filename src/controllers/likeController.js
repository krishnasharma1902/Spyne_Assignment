const { v4: uuidv4 } = require('uuid');
const pool = require('../config/db');
  
const likeItem = async (req, res) => {
    const { itemId, userId, type } = req.body;
  
    try {
      await pool.query(
        'INSERT INTO likes (id, user_id, item_id, type) VALUES (?, ?, ?, ?)',
        [uuidv4(), userId, itemId, type]
      );
      res.status(201).json({ message: 'Item liked successfully' });
    } catch (err) {
      console.error('Error liking item:', err);
      res.status(500).json({ error: 'Failed to like item' });
    }
  };

module.exports = {
  likeItem,
};
