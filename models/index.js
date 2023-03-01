require('dotenv').config();
const Profile = require('./Profile');

const Post = require('./Post');

Profile.hasMany( Post , {
    foreignKey: 'profile_id'
});

Post.belongsTo( Profile , {
    foreignKey: 'profile_id'
});

module.exports = { Profile, Post };