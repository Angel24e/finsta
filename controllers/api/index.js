const router = require('express').Router();

const postRoutes = require('./postRoutes');

const profileRoutes = require('./profileRoutes');

router.use('/users', postRoutes);

router.use('/projects', profileRoutes);

module.exports = router;