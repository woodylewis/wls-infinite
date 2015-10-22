'use strict';

angular.module('infinitescroll', [
	'ui.router',
	'infinitescroll.mainCtrl'
])
.config(['$stateProvider', '$locationProvider', function($stateProvider) {
  $stateProvider
    .state('main', {
      url: "/main",
      views: {
        "state" : { templateUrl: "partials/main.html" }
      }
    })
    .state('referral', {
      url: "/narration/:narrationUrl",
      views: {
        "state" : { 
                    templateUrl: "partials/narration.html" ,
                    controller: function ($scope, $stateParams) {
                        $scope.$emit('referral', $stateParams.narrationUrl);
                    }
              }
        }
    });
}])
.run(['$state', function($state) {
  $state.go('main');
}])
.controller('appCtrl', ['$scope', '$state', function($scope, $state) {
  $scope.goHome = function () {
    $state.go('main');
  };
}]);
