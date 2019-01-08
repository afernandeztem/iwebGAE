const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

/* GET users listing. */
router.get('/misEntregas', (req, res, next) => {
	res.render('misEntregas', {});
});

module.exports = router;
