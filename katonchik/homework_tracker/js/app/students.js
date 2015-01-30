/**
 * Created by vkatolyk on 29.01.2015.
 */

define(['Dropzone', 'handlebars'], function(dropzone, Handlebars){

    var Students = function(containerElement, category) {
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
                        Handlebars.registerHelper('decode', function(encoded){
                            return window.atob(encoded); //atob = decode
                        });
                        Handlebars.registerPartial("studentRow", document.getElementById("studentRow").innerHTML);
                        containerElement.innerHTML = template(response);

                        //Initialize dropzone box
                        var dropbox = new dropzone(document.getElementById('dropzone'));

                        //Add event listener to the New Student form
                        self.initializeAddForm();

                    }
                });

        };

        this.initializeAddForm = function()
        {
            var addButton = document.getElementById('addButton');
            addButton.addEventListener('click', function(e){
                var newStudentName = document.getElementById('nameInput').value;
                var newStudentAvatar = document.getElementsByClassName('img-upload-thumb')[0].src;
                var encodedImg = window.btoa(newStudentAvatar); //btoa = encode (data:image -> ZGFOYT)
                var params = {'name': newStudentName, 'avatar':encodedImg};
                httpCall("POST", "http://webdevcourses.frisbee.lviv.ua/students",
                    params,
                    function(response){
                        if (response.successful) {
                            var source = document.getElementById('studentRow').innerHTML;
                            Handlebars.registerHelper('decode', function(encoded){
                                return window.atob(encoded); //atob = decode
                            });
                            var template = Handlebars.compile(source);
                            var div = document.createElement('div');
                            div.innerHTML = template(response.student);


                            var studentRowArticle = div.firstElementChild;
                            console.log(studentRowArticle.innerHTML);
                            document.getElementById('studentListing').appendChild(studentRowArticle);
                        }
                    });

                e.preventDefault();
                return false;
            })
        };

        this.getStudents(category);

    };
    return Students;
});
