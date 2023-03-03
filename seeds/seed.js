const sequelize = require('../config/connection');

const { Profile, Post } = require('../models');

const profileData = require('./profileData.json');
const postsData = require('./postsData.json');

const seedDatabase = async () => {
    await sequelize.sync({ false: true });

    const profiles = await Profile.bulkCreate( profileData ,{
        individualHooks: true,
        returning: true,
    });
    /// what should be placed instead of users?
    for (const posts of postsData) {
        await Post.create({
            ...posts,
            profile_id: profiles[Math.floor(Math.random() * profiles.length)].id,
        });
    }

    process.exit(0);
}

seedDatabase();