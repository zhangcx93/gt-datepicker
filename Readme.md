#gtDatePicker

##How to use

1.include the js script

2.add 'gtDatePicker' module
    angular.module('myApp', [
      'gtDatePicker'
    ])

3.use directive 'gt-date-picker' with:
    begin, end attribute to pass model;
    optional on-change to trigger change event, note that the parameter of it has to be exactly 'begin', 'end'
    in form of on-change='what-ever-change-fn(begin, end)'
    for example:

'''js
      <div gt-date-picker begin="begin" end="end" on-change="change(begin, end)"></div>

  angular.module('myApp', [
    'gtDatePicker'
  ]).controller('myCtrl', function ($scope) {
    $scope.begin = '2015-02-26'; //a string of date, which can be parsed by javasript Date() object
    $scope.end = '2015-04-12';
    $scope.change = function(begin, end) {
      console.log(begin, end);
    };
//    setTimeout(function(){
//      $scope.end = '2015-03-12';
//      $scope.$apply();
//    }, 2000);
//when model changed from outside, remember to use $scope.$apply() to update the view
  })
'''
