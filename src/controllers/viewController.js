const { v4: uuidv4 } = require('uuid');
const pool = require('../config/db');

const incrementViewCount = async (req, res) => {
    const discussionId = req.params.discussionId;
  
    try {
      await pool.query('INSERT INTO views (id, discussion_id) VALUES (?, ?)', [uuidv4(), discussionId]);
      res.json({ message: 'View count incremented' });
    } catch (err) {
      console.error('Error incrementing view count:', err);
      res.status(500).json({ error: 'Failed to increment view count' });
    }
  };
  
  const getViewCount = async (req, res) => {
    const discussionId = req.params.discussionId;
  
    try {
      const [rows] = await pool.query('SELECT COUNT(*) AS viewCount FROM views WHERE discussion_id = ?', [discussionId]);
      res.json({ viewCount: rows[0].viewCount });
    } catch (err) {
      console.error('Error getting view count:', err);
      res.status(500).json({ error: 'Failed to get view count' });
    }
  };

module.exports = {
  incrementViewCount,
  getViewCount,
};
