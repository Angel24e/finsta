const Profile = require('./profile');

const Posts = require('./posts');

Profile.hasMany( Posts , {

});

Posts.belongsTo( Profile , {
    
});

module.exports = { Profile, Posts };