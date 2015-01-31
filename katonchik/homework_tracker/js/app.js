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
//document.domain = "webdevcourses.frisbee.lviv.ua";

require( ['app/students', 'app/assignments', 'app/students_assignments'],
  function(    Students,       Assignments,       StudentsAssignments) {
        document.getElementById("menu").addEventListener('click', function (e) {
            var category,
                assignments;
            if (e.target && e.target.classList.contains("menu__item")) {
                var mainContainer = document.getElementById("main");
                var pageId = e.target.id;
                switch (pageId) {
                    case 'students':
                        var students = new Students(mainContainer);
                        break;
                    case 'cssAssignments':
                        category = 1;
                        assignments = new Assignments(mainContainer, category);
                        break;
                    case 'jsAssignments':
                        category = 2;
                        assignments = new Assignments(mainContainer, category);
                        break;
                    case 'cssSummary':
                        category = 1;
                        assignments = new StudentsAssignments(mainContainer, category);
                        break;
                    case 'jsSummary':
                        category = 2;
                        assignments = new StudentsAssignments(mainContainer, category);
                        break;
                }
            }
            e.preventDefault();
            return false;
        })
});
