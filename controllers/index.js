const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const postRoutes = require('./api/postRoutes'); 

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

// Route for creating a new post
router.get('/newPost', (req, res) => {
    res.render('newPost', {
        logged_in: req.session.loggedIn,
    });
});


router.use('/post', postRoutes); 

router.use((req, res) => {
    res.status(404).send("<h1>Wrong Route!</h1>");
});

module.exports = router;
