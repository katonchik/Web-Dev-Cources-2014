/**
 * Created by vkatolyk on 29.01.2015.
 */

function Students(containerElement, category) {

    this.getStudents = function(category){
        var params={};
        if(category){
            params = {'category':category};
        }
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

    };

    this.getStudents(category);

}
