'use strict';

/**
 * @ngdoc function
 * @name amapApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the amapApp
 */
angular.module('amapApp')
  .controller('MainCtrl', function ($scope) {
    
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.lng = 116.397428;
    $scope.lat = 39.90923;

    $scope.getPath = function() {
	 	var lngX = $scope.lng;
        var latY = $scope.lat;
        var lineArr = [];
        lineArr.push([lngX, latY]);
        for (var i = 1; i < 100; i++) {
          lngX = lngX + Math.random() * 0.05;
          if (i % 2) {
            latY = latY + Math.random() * 0.0001;
          } else {
            latY = latY + Math.random() * 0.06;
          }
          lineArr.push([lngX, latY]);
        }
    };

  });
