const router = require('express').Router();
const { Article } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newArticle = await Article.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newArticle);

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const articleData = await Article.update(
    {
      title: req.body.articleTitle,
      content: req.body.articleContent,
    },
    {
      where: {
        id: req.params.id,
      },
    });

    if (!articleData) {
      res.status(404).json({ message: 'No matching ID.' });
      return;
    }

    res.status(200).json(articleData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

module.exports = router; 