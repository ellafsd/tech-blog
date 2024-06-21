const router = require('express').Router();
const { User, Post } = require('../../models');

// Route to get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{ model: Post }],
        });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to get a single user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [{ model: Post }],
        });

        if (!user) {
            res.status(404).json({ message: "No user found with that id!" });
            return;
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err); 
    }
});

// Route to create a new user
router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;

            res.status(200).json(dbUserData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to update a user by ID
router.put('/:id', async (req, res) => {
    try {
        const user = await User.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!user[0]) {
            res.status(404).json({ message: "No user found with that id!" });
            return;
        }

        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!user) {
            res.status(404).json({ message: "No user found with that id!" });
            return;
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route for user login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect username, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route for user logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
