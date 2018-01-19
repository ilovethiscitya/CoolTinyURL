/**
 * Created by jianzhe on 2017/12/5.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlService = require('../services/urlService');
var statsService = require('../services/statsService');

router.post("/urls", jsonParser, function (req,res) {
    var longUrl = req.body.longUrl;
    //console.log("rest.js    req = " + req);
    //console.log("rest.js    res = " + res.body);
    urlService.getShortUrl(longUrl, function (url) {
        res.json(url);
    });
});

router.get("/urls/:shortUrl", function (req,res) {
    var shortUrl = req.params.shortUrl;
//    var longUrl = urlService.getLongUrl(shortUrl);
    urlService.getLongUrl(shortUrl,function (url) {
        if(url) {
           res.json(url);
        } else {
            res.status(404).send("404 Error!");
        }
    });
});

router.get("/urls/:shortUrl/:info", function(req,res) {
  statsService.getUrlInfo(req.params.shortUrl,req.params.info, function(data) {
    res.json(data);
  })
});
module.exports = router; // 生成的router返回过去
