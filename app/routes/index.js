/**
 * Created by jianzhe on 2017/12/7.
 */
var express = require('express');
var router = express.Router();
var urlService = require('../services/urlService');
var path = require('path');

router.get("/", function (req,res) {
    res.sendFile("index.html",{root:path.join(__dirname, '../public/views/')});
});

module.exports = router;