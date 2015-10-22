'use strict';

angular.module('infinitescroll.narrationEngine', [])
.factory('NarrationEngine', ['$q', '$http', function($q, $http) {

  var NarrationEngine = function() {
    this.narrations = [];
    this.busy = false;
    this.id = 'n';
    this.narrationPageUrl = 'http://mean.wlsllc.com:7100/narration-page/';
    this.narrationReferralUrl = 'http://mean.wlsllc.com:7100/narration/';
  };

  NarrationEngine.prototype.nextNarrations = function() {
    if(this.busy) return;
    this.busy = true;

    this.fetchNarrationPage(this.id)
    .then(function (narrations) {
      for(var i=0; i < narrations.length; i++) {
        this.narrations.push(narrations[i]);
      }
      this.busy = false;
      this.id = narrations[narrations.length - 1]._id;
    }.bind(this));
  };

  NarrationEngine.prototype.fetchNarrationPage = function(id) {
      var deferred = $q.defer();
      $http.get(this.narrationPageUrl + id)
      .success( function(data) {
        deferred.resolve(data);
      })
      .error(function(reason) {
        deferred.reject(reason);
      });
      return deferred.promise;
  };
  NarrationEngine.prototype.fetchNarrationUrl = function(url) {
      var deferred = $q.defer();
      $http.get(this.narrationReferralUrl + url)
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(reason) {
        deferred.reject(reason);
      });
      return deferred.promise;
  };
  return NarrationEngine;
}]);