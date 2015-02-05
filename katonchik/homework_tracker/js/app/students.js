/**
 * Created by vkatolyk on 29.01.2015.
 */

define(['Util', 'Dropzone', 'handlebars'], function(Util, dropzone, Handlebars){

    var Students = function(containerElement, category) {
        var self = this,
            sortKey,
            isSortAsc = true, //reverse is -1
            studentsTemplateSource,
            studentTemplateSource;

        this.studentArray = [];

        function initializeHeader() {
            console.log("initializing header");
            var headerElement = document.getElementsByClassName('listing__header')[0];
            headerElement.addEventListener('click', function (e) {
                var prevSortKey = sortKey;
                sortKey = null;
                if (e.target.classList && e.target.classList.contains("listing--students__name")) {
                    sortKey = 'student_name';
                }
                else if (e.target.classList && e.target.classList.contains("listing--students__completed")) {
                    sortKey = 'completed_count';
                }
                else if (e.target.classList && e.target.classList.contains("listing--students__outstanding")) {
                    sortKey = 'outstanding_count';
                }
                if (sortKey !== null) {
                    if (prevSortKey == null || prevSortKey != sortKey) {
                        isSortAsc = true;
                    }
                    else {
                        isSortAsc = Util.toggleSortOrder(isSortAsc);
                    }
                    sortStudents(sortKey, isSortAsc);
                }
            })
        }

        function initializeAddForm() {
            var addButton = document.getElementById('addButton');
            addButton.addEventListener('click', function (e) {
                var newStudentName = document.getElementById('nameInput').value;
                var newStudentAvatar = document.querySelector('.img-upload-thumb').src;
                var encodedImg = window.btoa(newStudentAvatar); //btoa = encode (data:image -> ZGFOYT)
                var params = {'name': newStudentName, 'avatar': encodedImg};
                Util.httpCall("POST", "http://webdevcourses.frisbee.lviv.ua/students",
                    params,
                    function (response) {
                        if (response.successful) {
                            var source = document.getElementById('studentRow').innerHTML;
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
            Util.sortArrOfObjectsByParam(self.studentArray, sortKey, isSortAsc);
            Util.emptyContainer('studentListing');
            renderListing({'students': self.studentArray})


        }


        function renderListing(studentsData) {
            console.log(studentsTemplateSource);
            console.log(studentTemplateSource);
            Handlebars.registerPartial("studentRow", studentTemplateSource);
            var template = Handlebars.compile(studentsTemplateSource);
            console.log(template);
            containerElement.innerHTML = template(studentsData);
            initializeHeader();

        }


        function getStudents(category) {
            return new Promise(function(resolve, reject){
                var params = {};
                if (category) {
                    params = {'category': category};
                }
                Util.httpCall("GET", "http://webdevcourses.frisbee.lviv.ua/students",
                    params,
                    function (response) {
                        resolve(response.itemsData);
                    },
                    function (response) {
                        reject(response.itemsData);
                    })
            })
        }


        Promise.all([getStudents(category), Util.getTemplate('students'), Util.getTemplate('student')])
            .then(function (data) {

//              var usersContainer = document.getElementById("userList");
                studentsTemplateSource = data[1];
                studentTemplateSource  = data[2];
                renderListing(data[0]);

                //Initialize dropzone box
                var dropbox = new dropzone(document.getElementById('dropzone'));

                //Add event listener to the New Student form
                initializeAddForm();
            })


    };
    return Students;
});
