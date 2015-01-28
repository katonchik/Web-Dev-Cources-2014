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
requirejs(['app/sub'], function(sub) {
    alert("inside requirejs function");
});

require(['app/sub'], function(sub) {
    alert("inside require function");
});