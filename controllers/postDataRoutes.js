const router = require('express').Router();
const { Post, User, Comment } = require('../models'); 
const withAuth = require('../utils/auth');

// GET /api/posts/: Fetches all blog posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [User] },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Fetch a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [User] },
      ],
    });

    if (!post) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update an existing post by ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!updatedPost[0]) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
