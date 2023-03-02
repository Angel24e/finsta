const router = require('express').Router();
const { Post, Profile } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    // Gets all posts and joins with profile data by name.
    try { 
        const postData = await Post.findAll({
            include: [ {
                model: Profile, 
                attributes: ['name'],
            },
        ],
        });
        // Serializationnn 
        const posts = postData.map((post)=> post.get ({plain: true}));

        // passing serialized data and session flag into template
        res.render('main',{
            posts,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', withAuth, async (req, res) => { 
    try {  
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: Post,
            attributes: ['name'],
          },
        ],
      });
      const post = postData.get({ plain: true });
  
      res.render('posts', {
        ...post,
        logged_in: req.session.logged_in
      });

    } catch (err) {
      res.status(500).json(err)
    }
});


router.get('/profile', withAuth, async (req,res) => {
  try {
    //finds profile based on the session ID
    const profileData = await Profile.findByPk(req.session.user_id, {
      attributes: {exclude: ['password']},
      include: [{model: Post }],
    });
    const profile = profileData.get({plain:true});
    res.render('profile',{
      ...profile,
      logged_in: true
    });
  } catch (err){
    res.status(500).json(err);
  }
});
// if user is already logged in, redirects the request to another dimension
router.get('/login',(req,res)=>{
  if(req.session.logged_in){
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

module.exports = router;