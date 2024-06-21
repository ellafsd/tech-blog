const router = require("express").Router();
const { Post, User } = require("../models");

// Authentication middleware
const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    next();
  }
};

// Route to get the homepage
router.get("/", async (req, res) => {
  try {
    const allPosts = await Post.findAll({
      include: [User],
    });
    const posts = allPosts.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render("homepage", { posts, loggedIn: req.session.loggedIn }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load posts' });
  }
});

// Route to get a single post by its ID
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [User],      // Include the user who made the post
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    const post = postData.get({ plain: true });
    res.render('comment', { post, loggedIn: req.session.loggedIn });    // Renders comment page with post details
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to load post' });
  }
});

// Route to get the login page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

// Route to get the signup page
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

module.exports = router;
