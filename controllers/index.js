const router = require('express').Router();

const apiRoutes = require('./api');
const allRoutes = require('./allRoutes');

router.use('/', allRoutes);
router.use('/api', apiRoutes);

module.exports = router;
