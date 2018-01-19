/**
 * Created by jianzhe on 2017/12/7.
 */
angular.module("tinyurlApp")
    .controller("homeController",["$scope","$http","$location",function ($scope, $http, $location) {
        $scope.submit = function () {
            $http.post("/api/v1/urls", {
                longUrl: $scope.longUrl
                }).success(function (data) {
                   $location.path("/urls/" + data.shortUrl); // 跳转另外一个页面
            });
        }
    }]);