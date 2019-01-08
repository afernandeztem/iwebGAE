const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/add', (req, res, next) => {
	res.render('addSerie', {});
});

module.exports = router;
