"use strict";

var module = angular.module(
  'gtDatePicker', []
);

module.constant('gtDatePickerConfig', {
  template: 'src/datePicker.html'
});


module.directive("gtDatePicker", ['gtDatePickerConfig', function (config) {
  return {
    template: '<div ng-include="template"></div>',
    scope: {
      beginModel: "=begin",
      endModel: "=end",
      onChange: "&"
    },
    link: function (scope, element, attrs) {
      var format = function (num) {
        return ('0' + num).slice(-2);
      };

      var Time = function (date) {
        date = new Date(date);//format what ever stuff
        date.setHours(0, 0, 0, 0);//to begin of day
        this.date = date;
      };

      Time.prototype.isAfter = function (other) {
        //check if self is after other
        if (other.date.getTime() <= this.date.getTime()) {
          return true;
        }
      };

      Time.prototype.isActive = function () {
        //check if self is in scope.begin && scope.end
        return this.isAfter(scope.begin) && scope.end.isAfter(this);
      };

      Time.prototype.equal = function (other) {
        return this.date.getTime() == other.date.getTime();
      };

      Time.prototype.getMonth = function () {
        return this.date.getFullYear() + "-" + format(this.date.getMonth() + 1);
      };

      Time.prototype.toString = function () {
        return this.date.getFullYear() + '-' + format(this.date.getMonth() + 1) + '-' + format(this.date.getDate())
      };

      Time.prototype.yesterday = function () {
        var copy = new Date(this.date);
        copy.setDate(copy.getDate() - 1);
        return new Time(copy);
      };

      Time.prototype.lastMonth = function () {
        var copy = new Date(this.date);
        copy.setMonth(copy.getMonth() - 1);
        copy.setDate(1);
        return new Time(copy);
      };

      Time.prototype.offsetDate = function (offset) {
        this.date.setDate(this.date.getDate() + offset);
        return this;
      };

      Time.prototype.nextMonth = function () {
        var copy = new Date(this.date);
        copy.setMonth(copy.getMonth() + 1);
        copy.setDate(1);
        return new Time(copy);
      };

      Time.prototype.daysOfMonth = function () {
        return new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
      };

      Time.prototype.firstDay = function () {
        var copy = new Date(this.date);
        copy.setDate(1);
        return copy.getDay();
      };

      Time.prototype.lastDay = function () {
        var days = this.daysOfMonth();
        var copy = new Date(this.date);
        copy.setDate(days);
        return copy.getDay();
      };

      Time.prototype.getLastDay = function () {
        var copy = new Date(this.date);
        copy.setDate(this.daysOfMonth());
        return new Time(copy);
      };

      Time.prototype.isToday = function() {
        var today = new Time(new Date());
        return this.equal(today);
      };

      var buildMonth = function (time) {
        var monthList = [], t;
        for (var i = 0; i < time.firstDay(); i++) {
          t = time.lastMonth().getLastDay().offsetDate(i - time.firstDay() + 1);
          t.overflow = true;
          monthList.push(t);
        }
        for (var j = 0; j < time.daysOfMonth(); j++) {
          t = new Time(time.date);
          t.date.setDate(j + 1);
          monthList.push(t)
        }
        for (var k = 0; k < 6 - time.lastDay(); k++) {
          t = time.nextMonth().offsetDate(k);
          t.overflow = true;
          monthList.push(t);
        }
        return monthList;
      };

      var setView = scope.setView = function (leftDate) {
        leftDate = leftDate || scope.end.lastMonth();
        scope.leftMonth = leftDate;
        scope.rightMonth = leftDate.nextMonth();
        scope.month = buildMonth(leftDate);
        scope.nextMonth = buildMonth(leftDate.nextMonth());
      };

      //load template
      scope.template = config.template;

      var reset = function() {
        //load end time
        scope.end = new Time(scope.endModel);

        //load begin time, check overlap
        var begin = new Time(scope.beginModel);
        if (!scope.end.isAfter(begin)) {
          begin = scope.end.yesterday();
        }
        scope.begin = begin;
        setView();
      };

      reset();

      //scope.month = begin.getMonth();

      scope.monthTitle = [
        "Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"
      ];

      scope.prev = function () {
        setView(scope.leftMonth.lastMonth());
      };

      scope.next = function () {
        setView(scope.leftMonth.nextMonth());
      };

      var status = 0; //means inactive;

      var tempBegin;

      scope.show = false;

      scope.click = function (self) {
        if (status == 0) {
          //if inactive
          status = 1; //set active
          scope.begin = self;
          tempBegin = self;
          scope.end = scope.begin;
        }
        else if (status == 1) {
          status = 0;
        }
      };

      scope.hover = function (self) {
        if (status == 1) {
          if (tempBegin.isAfter(self)) {
            scope.end = tempBegin;
            scope.begin = self;
          }
          else {
            scope.begin = tempBegin;
            scope.end = self;
          }
        }
      };

      scope.showPicker = function() {
        scope.show = !scope.show;
      };

      scope.confirm = function() {
        scope.beginModel = scope.begin.toString();
        scope.endModel = scope.end.toString();
        scope.show = false;
        if(typeof scope.onChange == 'function') {
          scope.onChange({
            begin: scope.beginModel,
            end: scope.endModel
          });
        }
      };

      var watched = function() {
        return scope.begin.toString() + "_" + scope.end.toString();
      };

      scope.text = {};

      scope.$watch(watched, function() {
        scope.text.begin = scope.begin.toString();
        scope.text.end = scope.end.toString();
      });

      var watchedModel = function() {
        return scope.beginModel + "_" + scope.endModel;
      };

      scope.$watch(watchedModel, function() {
        reset();
      });

      scope.changeBegin = function(text) {
        var changeBegin = new Time(text);
        if(changeBegin.date == "Invalid Date") {
          scope.text.begin = scope.begin.toString();
          return;
        }
        if(changeBegin.isAfter(scope.end)) {
          scope.end = changeBegin;
        }
        scope.begin = changeBegin;
        setView(changeBegin);
      };

      scope.changeEnd = function(text) {
        var changeEnd = new Time(text);
        if(changeEnd.date == "Invalid Date") {
          scope.text.end = scope.end.toString();
          return;
        }

        if(scope.begin.isAfter(changeEnd)) {
          scope.begin = changeEnd;
        }
        scope.end = changeEnd;
        setView(changeEnd.lastMonth());
      };

      scope.cancel = function() {
        reset();
        scope.show = false;
      };

      //end of link
    }
  }
}]);

