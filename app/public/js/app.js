/**
 * Created by jianzhe on 2017/12/7.
 */
var app = angular.module("tinyurlApp",["ngRoute","ngResource","chart.js"]);

app.config(function ($routeProvider) { //配置前端router
    $routeProvider
        .when("/", {
            templateUrl: "./public/views/home.html",
            controller: "homeController"
        })

        .when("/urls/:shortUrl",{
            templateUrl: "./public/views/url.html",
            controller: "urlController"
        })
});
