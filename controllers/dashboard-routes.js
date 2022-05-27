const router = require('express').Router();
const { Article, User} = require('../models');
const withAuth = require('../utils/auth');

module.exports = router;