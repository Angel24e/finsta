const sequelize = require('../config/connection');

const { User, Post } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

<<<<<<< HEAD
    const users = await User.bulkCreate(userData, {
=======
    const users = await User.bulkCreate( userData, {
>>>>>>> 743874f826c17f257add9e7e1c8f74af5a176ce0
        individualHooks: true,
        returning: true,
    });
    /// what should be placed instead of users?
<<<<<<< HEAD
    for (const Post of postsData) {
        await Post.create({
            ...Post,
=======
    for (const post of postData) {
        await Post.create({
            ...post,
>>>>>>> 743874f826c17f257add9e7e1c8f74af5a176ce0
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
}

seedDatabase();