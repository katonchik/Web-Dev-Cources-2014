/**
 * Created by User on 05.01.2015.
 */

function httpCall(method, url, data, resolve, reject){
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
}

