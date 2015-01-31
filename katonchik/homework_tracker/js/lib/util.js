define('Util', function(){
    var Util = function() {

        this.httpCall = function(method, url, data, onReady){
            var httpRequest = new XMLHttpRequest(),
                params = '',
                paramCounter = 0,
                conjunction = "";

            for (var prop in data) {
                if (data.hasOwnProperty(prop)) {
                    if(paramCounter > 0){
                        conjunction = "&";
                    }
                    params += conjunction + prop + "=" + data[prop];
                }
                paramCounter++;
            }
            if(method=="GET") {
                url = url + "?" + params;
                params='';
            }

            httpRequest.open(method, url);
            httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            httpRequest.send(params);
            httpRequest.onreadystatechange = function(){
                if(httpRequest.readyState == 4)
                {
                    if(httpRequest.response){
                        var response = JSON.parse(httpRequest.response);
                        if(response.successful) {
                            onReady(response);
                        }
                        else {
                            console.log("Backend action failed: " + response.msg);
                        }
                    }
                    else {
                        console.log("Response empty.");
                    }
                }
            };
            httpRequest.ontimeout = function(){
                console.log("Connect to " + url + " timed out.");
                return false;
            };
        };



        this.sortArrOfObjectsByParam = function(arrToSort /* array */, strObjParamToSortBy /* string */, sortAscending /* bool(optional, defaults to true) */) {
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


        this.toggleSortOrder = function (isSortAsc) {
            return !isSortAsc;
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