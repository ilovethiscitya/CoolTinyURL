var urlModel = require('../models/urlModel');
var redis = require('redis');

var host = process.env.REDIS_PORT_6379_TCP_ADDR || '127.0.0.1';
var port = process.env.REDIS_PORT_6379_TCP_PORT || '6379';

var redisClient = redis.createClient(port, host);
var encode = [];

var genCharArray = function (charA, charZ) {
    //console.log("come here!  genCharArray start");

    var arr = [];
    var i = charA.charCodeAt(0);
    var j = charZ.charCodeAt(0);

    for (; i <= j; i++) {
        arr.push(String.fromCharCode(i));
    }

    //console.log("come here!  genCharArray end");

    return arr;
};

//console.log("come here!  concat begin");

encode = encode.concat(genCharArray('A', 'Z'));
encode = encode.concat(genCharArray('0', '9'));
encode = encode.concat(genCharArray('a', 'z'));

//console.log("come here!  concat end");

var getShortUrl = function (longUrl, callback) {
    if (longUrl.indexOf('http') === -1) {
        longUrl = "http://" + longUrl;
    }

    redisClient.get(longUrl, function (err, shortUrl) {
       // console.log("we are trying so hard to use redis !!we are using redis !!we are using redis !!we are using redis !!we are using redis !!we are using redis !!we are using redis !!we are using redis !!we are using redis !!we are using redis !!we are using redis !!we are using redis !!we are using redis !!we are using redis !!we are using redis !!we are using redis !!we are using redis !!we are using redis !!we are using redis !!we are using redis !!we are using redis !!");
        if(err) {
            console.log(err);
        }
        //console.log("this is redis url!!!! MY GODDDDDDDD!" + "long URL = " + longUrl + "short URL = " + shortUrl);
        if (shortUrl) {
            //console.log("getShortUrl bye bye mongo DB!  longUrl = " + longUrl + "  shortUrl = " + shortUrl);
            callback({
                longUrl: longUrl,
                shortUrl: shortUrl
            });
        } else {
            urlModel.findOne({ longUrl: longUrl}, function (err, url) {
                //  handle err  ??
                if (url) {
                    callback(url);
                } else {
                    generateShortUrl(function (shortUrl) {
                        var url = new urlModel({ shortUrl: shortUrl, longUrl: longUrl});
                        url.save();
                        redisClient.set(shortUrl, longUrl);
                        redisClient.set(longUrl, shortUrl);
                        callback(url);
                    });

                }

            });
        }
    });
};

var convertTo62 = function (num) {
    console.log("convertTo62:  num = " + num);
    var result = '';
    do {
        result = encode[num % 62] + result;
        num = Math.floor(num / 62);
    } while (num);
    return result;
};

var generateShortUrl = function (callback) {
    urlModel.find({}, function (err, urls) {
        callback(convertTo62(urls.length));
    });
};

var getLongUrl = function (shortUrl, callback) {
    redisClient.get(shortUrl, function (err, longUrl) {
        if (longUrl) {
            callback({
                longUrl: longUrl,
                shortUrl: shortUrl
            });
        } else {
            urlModel.findOne({ shortUrl: shortUrl}, function (err, url) {
               if (url) {
                    callback(url);
                 }
            });
        }
    });




};

module.exports = {
    getShortUrl: getShortUrl,
    getLongUrl: getLongUrl
};
