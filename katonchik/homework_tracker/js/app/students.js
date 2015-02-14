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
            to = 9,
            perPage,
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
                    perPage = to - from;
                    from = 0;
                    to = perPage - 1;
                    loadStudents();
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
            var perPage = to - from,
                pageCount = Math.ceil(totalCount / perPage),
                pageScrollContainer = document.getElementById('pageScroll'),
                i;

            console.log("pageCount: " + pageCount);
            for(i=0; i<pageCount; i++){
                var aFrom = i*perPage;
                var aTo = aFrom + perPage;
                var pageNumber = i+1;
                var pageLink;
                if(aFrom === from){
                    pageLink = document.createElement('span');
                } else {
                    pageLink = document.createElement('a');
                    pageLink.href = "?from=" + aFrom + "&to=" + aTo;
                    pageLink.classList.add('scroll');
                }
                pageLink.innerHTML = pageNumber;
                pageScrollContainer.appendChild(pageLink);

                pageScrollContainer.addEventListener('click', function(e){
                    if(e.target && e.target.classList.contains('scroll')) {
                        e.preventDefault();
                        console.log("clicked");
                        perPage = to - from;
                        from = from + perPage;
                        to = to + perPage;
                        loadStudents();
                    }
                })
            }

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


        function loadStudents() {
            return getStudents(sortKey, isSortAsc, from, to)
                .then(function(studentArray){
                    self.studentArray = studentArray;
                    renderListing({'students': self.studentArray});
                    updateSortIndicators();
                    renderPageScroll(from, to, totalCount);
                })
        }


        Promise.all([Util.getTemplate('students'), Util.getTemplate('student'), getTotalStudentCount()])
            .then(function(data) {
                studentsTemplate = Handlebars.compile(data[0]);
                studentTemplate = Handlebars.compile(data[1]);
                totalCount = data[2];
                return loadStudents();
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
