const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const discussionRoutes = require('./routes/discussionRoutes');
const likeRoutes = require('./routes/likeRoutes');
const viewRoutes = require('./routes/viewRoutes');
const commentRoutes = require('./routes/commentRoutes');



app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/views', viewRoutes);
app.use('/api/comments', commentRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
