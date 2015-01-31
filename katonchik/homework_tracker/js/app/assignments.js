/**
 * Created by vkatolyk on 29.01.2015.
 */

define(['handlebars', 'Util'], function(Handlebars, Util){

    var Assignments = function(containerElement, category) {

        var util = new Util();

        this.getAssignments = function(category){
            var params={};
            if(category){
                params = {'category':category};
            }
            util.httpCall("GET", "http://webdevcourses.frisbee.lviv.ua/assignments",
                params,
                function(response){
                    if (response) {
                        var templateElement = document.getElementById('assignmentsTemplate');
                        var source = templateElement.innerHTML;
                        console.log("category: " + category);
                        Handlebars.registerHelper('category', function(){
                            return category;
                        });
                        var template = Handlebars.compile(source);
                        containerElement.innerHTML = template(response);
                    }
                });

        };

        this.getAssignments(category);

    };

    return Assignments;
});
