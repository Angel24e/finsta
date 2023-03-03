


const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Profile } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const profileData = await Profile.create(req.body);
    req.session.save(() => {
      req.session.profile_id = profileData.id;
      req.session.logged_in = true;

      res.status(200).json(profileData);
    });

  } catch (err) {
    res.status(400).json(err);

  }
});
////// AUTH? //////
router.post('/login', withAuth, async (req, res) => {
  try {
    const profileData = await Profile.findOne({ where: { email: req.body.email } });
    if (!profileData) {
      res.status(400).json({ message: "Incorrect email or password, try again" });
      return;
    }
    const validPassword = await profileData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect email or password, try again" });
      return;
    }
    req.session.save(() => {
      req.session.profile_id = profileData.id;
      req.session.logged_in = true;
      res.json({ user: profileData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;