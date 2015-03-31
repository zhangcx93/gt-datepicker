angular.module('gtDatePicker').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/datePicker.html',
    "<div class=\"date-picker\">\n" +
    "  <div class=\"date-picker-value\" ng-click=\"showPicker()\">\n" +
    "    {{ beginModel }} - {{ endModel }}\n" +
    "  </div>\n" +
    "  <div class=\"date-picker-content\" ng-show=\"show\">\n" +
    "    <div class=\"date-picker-top\">\n" +
    "      <div class=\"month-helper\" ng-click=\"prev()\">\n" +
    "        <span class=\"month-helper-left\"></span>\n" +
    "      </div>\n" +
    "      <div class=\"month-wrap\">\n" +
    "        <div class=\"month-title\">\n" +
    "          {{ leftMonth.getMonth() }}\n" +
    "        </div>\n" +
    "        <div class=\"day-title\">\n" +
    "      <span class=\"day-title-item\" ng-repeat=\"day in monthTitle\">\n" +
    "        {{ day }}\n" +
    "      </span>\n" +
    "        </div>\n" +
    "    <span class=\"date-number\" ng-click=\"click(day)\" ng-mouseover=\"hover(day)\" ng-class=\"{active: day.isActive(), first: day.isFirst(), last: day.isLast(), disabled: day.overflow, today: day.isToday()}\" ng-repeat=\"day in month\">\n" +
    "      {{ day.date.getDate() }}\n" +
    "    </span>\n" +
    "      </div>\n" +
    "      <div class=\"month-wrap\">\n" +
    "        <div class=\"month-title\">\n" +
    "          {{ rightMonth.getMonth() }}\n" +
    "        </div>\n" +
    "        <div class=\"day-title\">\n" +
    "      <span class=\"day-title-item\" ng-repeat=\"day in monthTitle\">\n" +
    "        {{ day }}\n" +
    "      </span>\n" +
    "        </div>\n" +
    "    <span class=\"date-number\" ng-click=\"click(day)\" ng-mouseover=\"hover(day)\" ng-class=\"{active: day.isActive(), first: day.isFirst(), last: day.isLast(), disabled: day.overflow, today: day.isToday()}\" ng-repeat=\"day in nextMonth\">\n" +
    "      {{ day.date.getDate() }}\n" +
    "    </span>\n" +
    "      </div>\n" +
    "      <div class=\"month-helper\" ng-click=\"next()\">\n" +
    "        <span class=\"month-helper-right\"></span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"date-picker-bottom\">\n" +
    "      <input type=\"text\" ng-model=\"text.begin\" ng-click=\"setView(begin)\" ng-blur=\"changeBegin(text.begin)\"> -\n" +
    "      <input type=\"text\" ng-model=\"text.end\" ng-click=\"setView(end.lastMonth())\" ng-blur=\"changeEnd(text.end)\">\n" +
    "\n" +
    "      <div class=\"bottom-button confirm\" ng-click=\"confirm()\">{{ button[0] }}</div>\n" +
    "      <div class=\"bottom-button cancel\" ng-click=\"cancel()\">{{ button[1] }}</div>\n" +
    "      <div style=\"clear: both\"></div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>"
  );

}]);
