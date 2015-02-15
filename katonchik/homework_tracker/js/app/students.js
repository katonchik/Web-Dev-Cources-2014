/**
 * Created by vkatolyk on 29.01.2015.
 */

define(['Util', 'Dropzone', 'handlebars'], function(Util, dropzone, Handlebars){

    var Students = function(containerElement) {
        var self = this,
            sortKey = 'student_name',
            isSortAsc = true, //reverse is -1
            studentsTemplate,
            studentTemplate,
            querySelector = '.listing--students__headerName',
            from = 0,
            perPage = 10,
            to = from + perPage - 1,
            totalCount;

        this.studentArray = [];

        function initializeHeader() {
            var headerElement = document.querySelector('.listing__header');
            headerElement.addEventListener('click', function (e) {
                var prevSortKey = sortKey;
                sortKey = null;
                if (e.target.classList && e.target.classList.contains("listing--students__headerName")) {
                    sortKey = 'student_name';
                    querySelector = '.listing--students__headerName';
                }
                else if (e.target.classList && e.target.classList.contains("listing--students__headerCompleted")) {
                    sortKey = 'completed_count';
                    querySelector = '.listing--students__headerCompleted';
                }
                else if (e.target.classList && e.target.classList.contains("listing--students__headerOutstanding")) {
                    sortKey = 'outstanding_count';
                    querySelector = '.listing--students__headerOutstanding';
                }
                if (sortKey !== null) {
                    if (prevSortKey == null || prevSortKey != sortKey) {
                        isSortAsc = true;
                    }
                    else {
                        isSortAsc = Util.toggleSortOrder(isSortAsc);
                    }
                    from = 0;
                    to = from + perPage - 1;
                    loadStudents(from, to);
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
                            var template = Handlebars.compile(studentTemplateSource);
                            var div = document.createElement('div');
                            div.innerHTML = template(response.student);


                            var studentRowArticle = div.firstElementChild;
                            document.getElementById('studentListing').appendChild(studentRowArticle);
                        }
                    });

                e.preventDefault();
                return false;
            })
        }


        function updateSortIndicators() {
            //Util.sortArrOfObjectsByParam(self.studentArray, sortKey, isSortAsc);
            //Util.emptyContainer('studentListing');
            //renderListing({'students': self.studentArray});
            //console.log(querySelector);
            var sortByHeaderElement = document.querySelector(querySelector);
            var sortDirectionImg = document.createElement('img');
            if(isSortAsc) {
                sortDirectionImg.src = "images/sort-asc.png";
            }
            else {
                sortDirectionImg.src = "images/sort-desc.png";
            }
            sortByHeaderElement.appendChild(sortDirectionImg);
        }


        function renderListing(studentsData) {
            Handlebars.registerPartial("studentRow", studentTemplate);
            containerElement.innerHTML = studentsTemplate(studentsData);
            initializeHeader();
        }


        function renderPageScroll(from, to, totalCount) {
            var pageCount = Math.ceil(totalCount / perPage),
                pageScrollContainer = document.getElementById('pageScroll'),
                i;

            console.log("pageCount: " + pageCount);
            for(i=0; i<pageCount; i++){
                var aFrom = i*perPage;
                var aTo = aFrom + perPage;
                var pageNumber = i+1;
                var pageLink;
                console.log("aFrom = " + aFrom + "; from = " + from);
                if(aFrom == from){
                    pageLink = document.createElement('span');
                } else {
                    pageLink = document.createElement('a');
                    pageLink.classList.add('scrollItem');
                    pageLink.dataset.from = aFrom;
                    pageLink.dataset.to   = aTo;
                    pageLink.href = "#";
                }
                pageLink.innerHTML = pageNumber;
                pageScrollContainer.appendChild(pageLink);
            }

            pageScrollContainer.addEventListener('click', function(e){
                console.log("clicked");
                if(e.target && e.target.classList.contains('scrollItem')) {
                    e.preventDefault();
                    from = e.target.dataset.from;
                    to = e.target.dataset.to;
                    console.log("from:" + from + ", to: " + to);
                    loadStudents(from, to);
                }
            })

        }


        function getStudents(sortKey, isSortAsc, from, to) {
            return new Promise(function(resolve, reject) {
                var params = {'sortKey': sortKey, 'isSortAsc': isSortAsc, 'from': from, 'to': to};
                Util.httpCall("GET", "http://webdevcourses.frisbee.lviv.ua/students",
                    params,
                    function (response) {
                        resolve(response.students);
                    },
                    function (response) {
                        reject(response.students);
                    }
                )
            })
        }


        function getTotalStudentCount() {
            return new Promise(function(resolve, reject) {
                Util.httpCall("GET", "http://webdevcourses.frisbee.lviv.ua/student_count",
                    {},
                    function (response) {
                        resolve(response.count);
                    },
                    function (response) {
                        reject(response.count);
                    }
                )
            })
        }


        function loadStudents(first, last) {
            console.log("Loading " + perPage + " students from " + first + " to " + last);
            return getStudents(sortKey, isSortAsc, first, last)
                .then(function(studentArray){
                    self.studentArray = studentArray;
                    renderListing({'students': self.studentArray});
                    updateSortIndicators();
                    renderPageScroll(first, last, totalCount);
                })
        }


        Promise.all([Util.getTemplate('students'), Util.getTemplate('student'), getTotalStudentCount()])
            .then(function(data) {
                studentsTemplate = Handlebars.compile(data[0]);
                studentTemplate = Handlebars.compile(data[1]);
                totalCount = data[2];
                to = from + perPage;
                return loadStudents(from, to);
            })
            .then(function(data) {
                //Initialize dropzone box
                var dropbox = new dropzone(document.getElementById('dropzone'));

                //Add event listener to the New Student form
                initializeAddForm();

            })




    };
    return Students;
});
