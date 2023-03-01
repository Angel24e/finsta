const router = require('express').Router();
const { Post, Profile } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    // Gets all posts and joins with profile data
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
        res.render('mainpage',{
            posts,
            logged_in: req.session.logged_in

        });

    } catch (err) {
        res.status(500).json(err);
    }
});
///// do we need auth in this one ? 
router.get('/posts/:id', withAuth, async (req, res) => { 
    try {  const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      const project = postData.get({ plain: true });
  
      res.render('project', {
        ...project,
        logged_in: req.session.logged_in
      });

    } catch (err) {

    }
});

module.exports = router;