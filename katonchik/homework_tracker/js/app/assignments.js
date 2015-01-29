/**
 * Created by vkatolyk on 29.01.2015.
 */

function Assignments(containerElement, category) {

    this.getAssignments = function(category){
        var params={};
        if(category){
            params = {'category':category};
        }
        httpCall("GET", "http://webdevcourses.frisbee.lviv.ua/assignments",
            params,
            function(response){
                if (response) {
                    var templateElement = document.getElementById('assignmentsTemplate');
                    var source = templateElement.innerHTML;
                    var template = Handlebars.compile(source);
                    containerElement.innerHTML = template(response);
                }
            });

    };

    this.getAssignments(category);

}
