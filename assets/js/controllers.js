'use strict';

/* Controllers */

var phonecatApp = angular.module('myApp', ['ngMaterial']);

phonecatApp.controller('mainController', function($scope, $http) {
     var self = this;
     $scope.result = {
         next: 0,
         no: 0,
         yes: 0,
         step: 5
     };
     $scope.add = function(url){
         $http.get(url)
           .success(function(data, status, headers, config) {
                $scope.user = data;
                $scope.mainPhoto = data.photos[0].sizeBox;
           })
           .error(function(error, status, headers, config) {
                console.log(status);
                console.log("Error occured");
           });
     };

     $scope.add('data.json');
     $scope.next = function(){
          console.log('next');
          --$scope.result.step;
          $scope.result.next++;
          if ($scope.result.step <= 0)  {
              self.showResult();
              $scope.add('data.json');
          }
          else {
               $scope.add('data'+($scope.result.step)+'.json');
          }
      };
      $scope.no = function(){
          console.log('no');
          --$scope.result.step;
          $scope.result.no++;
          if ($scope.result.step <= 0) {
               self.showResult();
               $scope.add('data.json');
           }
           else {
               $scope.add('data'+($scope.result.step)+'.json');
           }
      };
      $scope.yes = function(){
          console.log('yes');
          --$scope.result.step;
          $scope.result.yes++;
         if ($scope.result.step <= 0) {
             self.showResult();
             $scope.add('data.json');
         }
         else {
             $scope.add('data'+($scope.result.step)+'.json');
         }
     };
      $scope.setImage = function(photo) {
          $scope.mainPhoto = photo.sizeBox;
      };
      self.showResult = function(){
           var output = "<p>Сказал 'да' : " + $scope.result.yes + "</p>";
           output += "<p>Сказал 'нет' : " + $scope.result.no + "</p>";
           output += "<p>пропустил : " + $scope.result.next + "</p>";
          $.fancybox({
              content: output,
              afterClose: function(){
                  $scope.result = {
                      next: 0,
                      no: 0,
                      yes: 0,
                      step: 5
                  };
              }
          });
      };
});
