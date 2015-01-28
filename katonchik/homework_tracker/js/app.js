/**
 * Created by vkatolyk on 27.01.2015.
 */

requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app'
    }
});

// Start the main app logic.
requirejs(['app/httpCallWrapper'], function(httpCallWrapper) {
    httpCall("GET", "http://www.corsproxy.com/webdevcourses.frisbee.lviv.ua/students_assignments",
        [], function(response){
            if(response)
            {
                console.log(response);
                console.log(r);
            }
        });
    console.log("inside requirejs function");
});

/*
//What's the difference?
require(['app/httpCall'], function(httpCall) {
    console.log("inside require function");
});
*/