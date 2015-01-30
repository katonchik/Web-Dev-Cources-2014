/**
 * Created by vkatolyk on 29.01.2015.
 */

function Students(containerElement, category) {
    var self = this;
    this.getStudents = function(category){
        var params={};
        if(category){
            params = {'category':category};
        }
        httpCall("GET", "http://webdevcourses.frisbee.lviv.ua/students",
            params,
            function(response){
                if (response) {
                    var source = document.getElementById('studentsTemplate').innerHTML;
                    var template = Handlebars.compile(source);
                    Handlebars.registerPartial("studentRow", document.getElementById("studentRow").innerHTML);
                    containerElement.innerHTML = template(response);
                    self.initializeAddForm();
                }
            });

    };

    this.initializeAddForm = function()
    {
        var addButton = document.getElementById('addButton');
        addButton.addEventListener('click', function(e){
            var newStudentName = document.getElementById('nameInput').value;
            var params = {'name': newStudentName};
            httpCall("POST", "http://webdevcourses.frisbee.lviv.ua/students",
                params,
                function(response){
                    if (response.successful) {
                        var source = document.getElementById('studentRow').innerHTML;
                        var template = Handlebars.compile(source);
                        var div = document.createElement('div');
                        div.innerHTML = template(response.student);

                        var studentRowArticle = div.firstElementChild;
                        console.log(studentRowArticle.innerHTML);
                        document.getElementById('studentListing').appendChild(studentRowArticle);



                        //var partialElement = document.getElementById('studentRow');
                        //var partialSource = partialElement.innerHTML;
                        //console.log(partialSource);
                        //Handlebars.registerPartial('studentRow', partialSource);

                        //containerElement.innerHTML = template(response);
                        //self.initializeAddForm();
                    }
                });

            e.preventDefault();
            return false;
        })
    };

    this.getStudents(category);



}
