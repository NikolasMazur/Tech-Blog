const router = require('express').Router();
const { Comment, Article, User} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Article,
          attributes: ['username'],
        },
      ],
      where: {
          article_id: req.params.id,
        },
      order: [['created_at', 'ASC']],
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.render('comments', { 
      comments, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;