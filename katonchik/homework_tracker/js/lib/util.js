/**
 * Created by User on 31.01.2015.
 */
define(function(){

    var Util = function() {

        this.sortArrOfObjectsByParam = function (arrToSort /* array */, strObjParamToSortBy /* string */, sortAscending /* bool(optional, defaults to true) */) {
            if (sortAscending == undefined) sortAscending = true;  // default to true

            if (sortAscending) {
                arrToSort.sort(function (a, b) {
                    return a[strObjParamToSortBy] > b[strObjParamToSortBy];
                });
            }
            else {
                arrToSort.sort(function (a, b) {
                    return a[strObjParamToSortBy] < b[strObjParamToSortBy];
                });
            }
        };

        this.toggleSortOrder = function (sortAsc) {
            return !sortAsc;
        };

        this.emptyContainer = function (containerElementId) {
            var containerElement = document.getElementById(containerElementId);
            while (containerElement.firstChild) {
                containerElement.removeChild(containerElement.firstChild);
            }
        }
    };
    return Util;
});


