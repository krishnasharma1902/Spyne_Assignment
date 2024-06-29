const { v4: uuidv4 } = require('uuid');
const pool = require('../config/db');

const addComment = async (req, res) => {
    const { discussionId, userId, text } = req.body;
    const commentId = uuidv4();
  
    try {
      await pool.query(
        'INSERT INTO comments (id, discussion_id, user_id, text) VALUES (?, ?, ?, ?)',
        [commentId, discussionId, userId, text]
      );
      res.status(201).json({ message: 'Comment added successfully' });
    } catch (err) {
      console.error('Error adding comment:', err);
      res.status(500).json({ error: 'Failed to add comment' });
    }
  };

  const updateComment = async (req, res) => {
    const commentId = req.params.commentId;
    const { text } = req.body;
  
    try {
      const [result] = await pool.query(
        'UPDATE comments SET text = ? WHERE id = ?',
        [text, commentId]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      res.json({ message: 'Comment updated successfully' });
    } catch (err) {
      console.error('Error updating comment:', err);
      res.status(500).json({ error: 'Failed to update comment' });
    }
  };
  
  const deleteComment = async (req, res) => {
    const commentId = req.params.commentId;
  
    try {
      const [result] = await pool.query('DELETE FROM comments WHERE id = ?', [commentId]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      res.json({ message: 'Comment deleted successfully' });
    } catch (err) {
      console.error('Error deleting comment:', err);
      res.status(500).json({ error: 'Failed to delete comment' });
    }
  };

  
  const addReply = async (req, res) => {
    const { commentId, userId, text } = req.body;
    const replyId = uuidv4();
  
    try {
      await pool.query(
        'INSERT INTO replies (id, comment_id, user_id, text) VALUES (?, ?, ?, ?)',
        [replyId, commentId, userId, text]
      );
      res.status(201).json({ message: 'Reply added successfully' });
    } catch (err) {
      console.error('Error adding reply:', err);
      res.status(500).json({ error: 'Failed to add reply' });
    }
  };


  module.exports = {
    addComment,
    updateComment,
    deleteComment,
    addReply,
  };