const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

// API routes
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

// Handle unknown API routes
router.use((req, res) => {
    res.status(404).send("<h1>Wrong API Route!</h1>");
});

module.exports = router;
