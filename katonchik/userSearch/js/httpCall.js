/**
 * Created by User on 05.01.2015.
 */

function httpCall(method, url, data, onReady){
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
            //console.log(response);
            if(response.successful) {
                //console.log("Backend action successful: " + response.msg);
                onReady(response);
            }
            else {
                console.log("Backend action failed: " + response.msg);
            }
        }
    };
    httpRequest.ontimeout = function(){
        console.log("Connect to " + url + " timed out.");
        return false;
    };
}
