var express = require('express'); // 先看是否有核心，去node—modules中找是否有express
var app = express();
var restRouter = require('./routes/rest');
var redirectRouter = require('./routes/redirect');
var indexRouter = require('./routes/index');
var mongoose = require('mongoose');
var useragent = require('express-useragent');

mongoose.connect("mongodb://user:user@ds161426.mlab.com:61426/tinyurl") //连接mongoDB

app.use('/node_modules',express.static(__dirname+ "/node_modules"));

app.use('/public',express.static(__dirname+ "/public"));

app.use(useragent.express());
app.use('/api/v1',restRouter);

app.use('/',indexRouter);

app.use('/:shortUrl',redirectRouter);

app.listen(3000);
