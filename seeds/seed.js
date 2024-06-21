const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./user.json');
const postData = require('./post.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced.'); // This line provides a high-level status

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    console.log('Users seeded.'); // This line provides a high-level status

    for (const post of postData) {
      await Post.create({
        ...post,
        user_id: users[Math.floor(Math.random() * users.length)].id, // Ensure snake_case for foreign key
      });
    }
    console.log('Posts seeded.'); // This line provides a high-level status

    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDatabase();
