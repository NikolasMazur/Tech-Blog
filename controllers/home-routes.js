const router = require('express').Router();
const { Article, Comment, User} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const articleData = await Article.findAll({
      include: [
        {
          model: Comment,
          attributes: ['content'],
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const articles = articleData.map((article) => article.get({ plain: true }));

    res.render('homepage', { 
      articles, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;