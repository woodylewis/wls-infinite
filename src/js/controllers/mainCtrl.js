'use strict';

angular
.module('infinitescroll.mainCtrl', [
  'infinite-scroll',
  'infinitescroll.narrationEngine'
])
.controller('MainCtrl', MainCtrl);

function MainCtrl($scope, $state, $filter, $location, $sce, NarrationEngine) {
  var vm = this;
  vm.ne = new NarrationEngine();
  vm.cn = {};
  vm.click = false;

  $scope.$on('referral', function(event, args) {
    if(vm.click === true) {
      vm.click = false;
    }
    else {
      vm.fetchUrl(args);
    }
  });

  function trustMarkup() {
    vm.markup = $sce.trustAsHtml(vm.cn.body);
  }

  vm.fetchNarration = function(theID) {
    var filtered = $filter('filter')(vm.ne.narrations, {_id: theID});
    vm.cn = filtered[0];
    trustMarkup();
    vm.click = true;
    $location.url('/narration/' + vm.cn.url);
  };

  vm.fetchUrl = function(theUrl) {
    vm.ne.fetchNarrationUrl(theUrl)
    .then(function (data) {
      vm.cn = data[0];
      trustMarkup();
    });
  };
}