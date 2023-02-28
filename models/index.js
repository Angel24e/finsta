const Profile = require('./profile');

const Posts = require('./posts');

Profile.hasMany( Posts , {
    foreignKey: 'profile_id'
});

Posts.belongsTo( Profile , {
    foreignKey: 'posts_id'
});

module.exports = { Profile, Posts };