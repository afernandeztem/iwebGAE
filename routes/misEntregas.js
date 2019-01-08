const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/misEntregas', (req, res, next) => {
	res.render('misEntregas', {});
});

module.exports = router;
