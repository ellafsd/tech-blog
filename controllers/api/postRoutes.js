const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../middleware/auth');

// Route to render the new post page
router.get('/new', withAuth, (req, res) => {
    res.render('newPost', {
        logged_in: req.session.loggedIn,
    });
});

// Route to handle post creation
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
