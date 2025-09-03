var express = require('express');
var router = express.Router();

const repo = require("../repositories/subjectRepository");

router.get('/', function (req, res, next) {
    res.json(repo.findAll())
});

router.get('/:id', function (req, res, next) {
    res.json(repo.getSubject(req.params.id));
});

module.exports = router;