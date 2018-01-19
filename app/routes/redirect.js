/**
 * Created by jianzhe on 2017/12/5.
 */
var express = require('express');
var router = express.Router();
var urlService = require('../services/urlService');
var statsService = require('../services/statsService');
var path = require('path');
router.get("*", function (req,res) {
    var shortUrl = req.originalUrl.slice(1);
    // 从第二个元素开始拿
//    var longUrl = urlService.getLongUrl(shortUrl);
    urlService.getLongUrl(shortUrl,function (url) {
        console.log("this is redirect.js!" + url);
        if(url) {
            res.redirect(url.longUrl);
            statsService.logRequest(shortUrl,req);
        } else {
             res.sendFile("404.html",{root: path.join(__dirname,'../public/views/')})

        }
    });
});

module.exports = router;
