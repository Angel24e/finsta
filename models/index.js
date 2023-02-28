const Profile = require('./Profile');

const Post = require('./Post');

Profile.hasMany( Post , {
    foreignKey: 'profile_id'
});

Posts.belongsTo( Profile , {
    foreignKey: 'posts_id'
});

module.exports = { Profile, Posts };