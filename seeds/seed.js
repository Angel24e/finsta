const sequelize = require('../config/connection');

const { Profile, Posts } = require('../models');

const profileData = require('./profileData.json');

const postsData = require('./postsData.json');

const seedDatabase = async () => {
    await sequelize.sync({ false: true });

    const profiles = await Profile.bulkCreate( profileData ,{
        individualHooks: true,
        returning: true,
    });
    
    for (const posts of postsData) {
        await Posts.create({
            ...posts,
            profile_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
}

seedDatabase();