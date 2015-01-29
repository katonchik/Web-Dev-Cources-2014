/**
 * Created by vkatolyk on 29.01.2015.
 */

function Students(containerElement, category) {

    if(category){
        params = {'category':category};
    }
    else{
        params = {};
    }
    this.getStudents = function(category){
        httpCall("GET", "http://webdevcourses.frisbee.lviv.ua/students",
            params,
            function(response){
                if (response) {
                    var templateElement = document.getElementById('studentsTemplate');
                    var source = templateElement.innerHTML;
                    var template = Handlebars.compile(source);
                    containerElement.innerHTML = template(response);
                }
            });

    }();

}
