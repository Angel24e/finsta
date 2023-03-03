const sequelize = require('../config/connection');

const { User, Post } = require('../models');

const userData = require('./userData.json');
const postsData = require('./postsData.json');

const seedDatabase = async () => {
    await sequelize.sync({ false: true });

    const users = await User.bulkCreate( userData ,{
        individualHooks: true,
        returning: true,
    });
    /// what should be placed instead of users?
    for (const posts of postsData) {
        await Post.create({
            ...posts,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
}

seedDatabase();