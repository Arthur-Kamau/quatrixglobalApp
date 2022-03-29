var express = require('express');
var router = express.Router();

/* tasks page. */
router.get('/', function(req, res, next) {
    res.json( { title: 'tasks' });
});

module.exports = router;
