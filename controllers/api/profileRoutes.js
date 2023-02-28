const router = require('express').Router();
const { Profile } = require('../../models');

router.post('/', withAuth, async (req, res) => {
    try {
        const userProfile = await Profile.create(req.body);
        req.session.save(() => {
            req.session.profile_id= userProfile.id ;
            req.session.logged_in=true; 
            
            res.status(200).json(userProfile);
        } );

    } catch (err) {
        res.status(400).json(err);

    }
});

router.post('/login', withAuth, async (req, res) => {
    try {

    } catch (err) {

    }
});

router.post('/logout', withAuth, async (req, res) => {
    try {

    } catch (err) {

    }
});

module.exports = router;