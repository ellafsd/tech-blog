const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../middleware/auth');

// Route to get the user's dashboard
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id },
            include: [{ model: User, attributes: ['username'] }],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', { posts, logged_in: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to get the page for adding a new post
router.get('/new', withAuth, (req, res) => {
    res.render('newPost', { logged_in: req.session.loggedIn });
});

// Route to edit an existing post
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['username'] }],
        });

        if (!postData || postData.user_id !== req.session.user_id) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        const post = postData.get({ plain: true });
        res.render('editPost', { post, logged_in: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
