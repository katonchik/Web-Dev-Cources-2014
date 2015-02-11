define('Util', [], function(){
    var Util = {
        self : this,
        httpCall : function(method, url, data, resolve, reject){
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
                    var response = JSON.parse(httpRequest.response);
                    switch(httpRequest.status)
                    {
                        case 200:
                            resolve(response);
                            break;
                        case 404:
                            console.log("resource not found: " + response.msg);
                        default:
                            console.log("Backend action failed: " + response.msg);
                            reject(response);
                    }
                }
            };
            httpRequest.ontimeout = function(){
                console.log("Connect to " + url + " timed out.");
                return false;
            };
        },


        /**
         * Sorts array of homogenous objects by an object property
         * @param arrToSort Array of objects to sort
         * @param strObjParamToSortBy String, the name of the object field
         * @param isSortAscending boolean, optional, defaults to true
         */
        sortArrOfObjectsByParam : function(arrToSort, strObjParamToSortBy, isSortAscending) {
            if (isSortAscending == undefined) isSortAscending = true;

            if (isSortAscending) {
                arrToSort.sort(function (a, b) {
                    return a[strObjParamToSortBy] > b[strObjParamToSortBy];
                });
            }
            else {
                arrToSort.sort(function (a, b) {
                    return a[strObjParamToSortBy] < b[strObjParamToSortBy];
                });
            }
        },


        toggleSortOrder : function(isSortAsc) {
            return !isSortAsc;
        },

        emptyContainer : function(containerElementId) {
            var containerElement = document.getElementById(containerElementId);
            while (containerElement.firstChild) {
                containerElement.removeChild(containerElement.firstChild);
            }
        },

        getTemplate : function(template){
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", 'js/templates/' + template + '.hbs');

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 404) {
                            reject(xhr.responseText);
                        } else if (xhr.status === 200) {
                            resolve(xhr.responseText);
                        }
                    }
                };
                ontimeout = function (err) {
                    reject(err);
                };
                xhr.send();
            });
        }


    };
    return Util;
});