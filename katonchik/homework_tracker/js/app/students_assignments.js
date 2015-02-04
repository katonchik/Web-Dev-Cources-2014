/**
 * Created by vkatolyk on 29.01.2015.
 */

define(['handlebars', 'Util'], function(Handlebars, Util){

    var StudentsAssignments = function(containerElement, category) {

        this.getAssignments = function(category){
            var params={};
            if(category){
                params = {'category':category};
            }
            Util.httpCall("GET", "http://webdevcourses.frisbee.lviv.ua/students_assignments",
                params,
                function(response){
                    if (response) {
                        var templateElement = document.getElementById('studentsAssignmentsTemplate');
                        var source = templateElement.innerHTML;
                        var template = Handlebars.compile(source);
                        containerElement.innerHTML = template(response);
                    }
                });

        };

        this.getAssignments(category);

    };
    return StudentsAssignments;
});