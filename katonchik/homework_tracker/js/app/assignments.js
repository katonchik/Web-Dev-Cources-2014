/**
 * Created by vkatolyk on 29.01.2015.
 */

function Assignments(containerElement, category) {

    if(category){
        params = {'category':category};
    }
    else{
        params = {};
    }
    this.getAssignments = function(category){
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

    }();

}
