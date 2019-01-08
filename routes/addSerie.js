const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

/* GET users listing. */
router.get('/add', (req, res, next) => {
	res.render('addSerie', {});
});

module.exports = router;
