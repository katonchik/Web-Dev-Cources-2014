/**
 * Created by vkatolyk on 29.01.2015.
 */

define(['Dropzone', 'handlebars', 'util'], function(dropzone, Handlebars, Util){

    var Students = function(containerElement, category) {
        var self = this;

        var sortKey,
            isSortAsc = false;

        this.studentArray = [];

        function initializeHeader()
        {
            var headerElement = document.getElementsByClassName('listing__header')[0];
            headerElement.addEventListener('click', function(e){
                var prevSortKey = sortKey;
                sortKey = null;
                if(e.target.classList && e.target.classList.contains("listing--students__name")) {
                    sortKey = 'name';
                }
                else if(e.target.classList && e.target.classList.contains("listing--students__completed")) {
                    sortKey = 'completed';
                }
                else if(e.target.classList && e.target.classList.contains("listing--students__outstanding")) {
                    sortKey = 'outstanding';
                }
                if(sortKey !== null) {
                    if(prevSortKey == null || prevSortKey != sortKey) {
                        isSortAsc = true;
                    }
                    else {
                        isSortAsc = Util.toggleSortOrder(isSortAsc);
                    }
                    sortStudents(sortKey, isSortAsc);
                }
            })
        }

        function initializeAddForm()
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
        }


        function sortStudents(sortKey, isSortAsc) {
            self.studentArray = Util.sortArrOfObjectsByParam(self.studentArray, sortKey, isSortAsc);
            Util.emptyContainer('studentListing');
            renderListing({'students' : self.studentArray})
        }





        function renderListing(data) {
            var source = document.getElementById('studentsTemplate').innerHTML;
            var template = Handlebars.compile(source);
            Handlebars.registerHelper('decode', function(encoded){
                return window.atob(encoded); //atob = decode
            });
            Handlebars.registerPartial("studentRow", document.getElementById("studentRow").innerHTML);
            containerElement.innerHTML = template(data);
        }


        this.getStudents = function(category){
            var params={};
            if(category){
                params = {'category':category};
            }
            httpCall("GET", "http://webdevcourses.frisbee.lviv.ua/students",
                params,
                function(response){
                    if (response) {

                        self.studentArray = response.students;
                        renderListing(response);

                        //Initialize dropzone box
                        var dropbox = new dropzone(document.getElementById('dropzone'));

                        initializeHeader();

                        //Add event listener to the New Student form
                        initializeAddForm();

                    }
                });

        };

        this.getStudents(category);

    };
    return Students;
});
