const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
  const { name, mobile_no, email, password } = req.body;
  const id = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [rows, fields] = await pool.query(
      'INSERT INTO users (id, name, mobile_no, email, password) VALUES (?, ?, ?, ?, ?)',
      [id, name, mobile_no, email, hashedPassword]
    );
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows, fields] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({ message: "User logged in successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = (req, res) => {
    const userId = req.params.id;
    const { name, mobile, email } = req.body;
  
    pool.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const updateUserQuery = 'UPDATE users SET name = ?, mobile = ?, email = ? WHERE id = ?';
      pool.query(updateUserQuery, [name, mobile, email, userId], (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'User updated successfully' });
      });
    });
  };

  const deleteUser = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const [result] = await pool.query('DELETE FROM users WHERE id = ?', [userId]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  };
  
  const getAllUsers = async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM users');
      res.json(rows);
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  };
  
  const searchUserByName = async (req, res) => {
    const { q } = req.query;
  
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE name LIKE ?', [`%${q}%`]);
      res.json(rows);
    } catch (err) {
      console.error('Error searching users by name:', err);
      res.status(500).json({ error: 'Failed to search users' });
    }
  };


module.exports = {
  signup,
  login,
  updateUser,
  deleteUser,
  getAllUsers,
  searchUserByName

};
