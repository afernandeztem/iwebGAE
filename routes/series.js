const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);
/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('series', { title: 'Series' });
});

module.exports = router;
