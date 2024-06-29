const { v4: uuidv4 } = require('uuid');
const pool = require('../config/db');


const createDiscussion = async (req, res) => {
    const { userId, text, image, hashtags } = req.body;
    const discussionId = uuidv4();
    const hashtagIds = [];
  
    try {
      await pool.query(
        'INSERT INTO discussions (id, user_id, text, image_url) VALUES (?, ?, ?, ?)',
        [discussionId, userId, text, image]
      );
  
      for (const tag of hashtags) {
        let [result] = await pool.query('SELECT id FROM hashtags WHERE tag = ?', [tag]);
        
        if (result.length === 0) {
          const [insertResult] = await pool.query('INSERT INTO hashtags (id, tag) VALUES (?, ?)', [uuidv4(), tag]);
          result = [{ id: insertResult.insertId }];
        }
        
        hashtagIds.push(result[0].id);
      }
        const values = hashtagIds.map((hashtagId) => [discussionId, hashtagId]);
      await pool.query('INSERT INTO discussion_hashtags (discussion_id, hashtag_id) VALUES ?', [values]);
  
      res.status(201).json({ message: 'Discussion created successfully' });
    } catch (err) {
      console.error('Error creating discussion:', err);
      res.status(500).json({ error: 'Failed to create discussion' });
    }
  };
  

  const updateDiscussion = async (req, res) => {
    const discussionId = req.params.discussionId;
    const { text, image, hashtags } = req.body;
  
    try {
      const hashtagsString = hashtags.join(', ');
  
      const [result] = await pool.query(
        'UPDATE discussions SET text = ?, image_url = ?, hashtags = ? WHERE id = ?',
        [text, image, hashtagsString, discussionId]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Discussion not found' });
      }
  
      res.json({ message: 'Discussion updated successfully' });
    } catch (err) {
      console.error('Error updating discussion:', err);
      res.status(500).json({ error: 'Failed to update discussion' });
    }
  }
  
  

const deleteDiscussion = async (req, res) => {
  const discussionId = req.params.discussionId;

  try {
    const [result] = await pool.query('DELETE FROM discussions WHERE id = ?', [discussionId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    res.json({ message: 'Discussion deleted successfully' });
  } catch (err) {
    console.error('Error deleting discussion:', err);
    res.status(500).json({ error: 'Failed to delete discussion' });
  }
};

const getDiscussionsByTag = async (req, res) => {
  const tag = req.params.tag;

  try {
    const [rows] = await pool.query('SELECT * FROM discussions WHERE hashtags LIKE ?', [`%${tag}%`]);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching discussions by tag:', err);
    res.status(500).json({ error: 'Failed to fetch discussions' });
  }
};

const searchDiscussionsByText = async (req, res) => {
  const { q } = req.query;

  try {
    const [rows] = await pool.query('SELECT * FROM discussions WHERE text LIKE ?', [`%${q}%`]);
    res.json(rows);
  } catch (err) {
    console.error('Error searching discussions by text:', err);
    res.status(500).json({ error: 'Failed to search discussions' });
  }
};

module.exports = {
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  getDiscussionsByTag,
  searchDiscussionsByText,
  updateDiscussion,
  deleteDiscussion,
  getDiscussionsByTag,


};
