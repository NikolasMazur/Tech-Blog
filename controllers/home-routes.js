const router = require('express').Router();
const { Article, Comment, User} = require('../models');
const withAuth = require('../utils/auth');

module.exports = router;