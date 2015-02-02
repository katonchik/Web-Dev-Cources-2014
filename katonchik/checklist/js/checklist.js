/**
 * Created by User on 04.01.2015.
 */


function CheckList() {

    var activeListContainer = document.getElementById('activeList');
    var adminSelect;
    var siteURL = "http://hat.frisbee.lviv.ua";

    /**
     * Adds task item to the task list
     * @param taskID
     * @param taskNameStr
     */
    function addItem(taskID, taskNameStr){
        var taskItem = document.createElement("div");
        taskItem.classList.add("task");
        taskItem.id = taskID;

        var taskName = document.createElement("span");
        taskName.classList.add("task-name");
        taskName.innerHTML = taskNameStr;
        taskItem.appendChild(taskName);

        console.log("2. type: " + typeof(adminSelect) + "; ");
        var responsible = adminSelect.cloneNode(true);
        taskItem.appendChild(responsible);

        var checkCompleted = document.createElement("input");
        checkCompleted.classList.add("check-completed");
        checkCompleted.setAttribute("type", "checkbox");
        taskItem.appendChild(checkCompleted);

        activeListContainer.appendChild(taskItem);

        var deleteControl = document.createElement("img");
        deleteControl.classList.add("delete-control");
        deleteControl.src="../images/delete.png";
        taskItem.appendChild(deleteControl);


    }

    /**
     * create dropdown with the list of admins
     * @param adminArray array of {'id':id, 'username':username} objects
     * @returns {HTMLElement}
     */
    function createAdminSelect(adminArray) {
        var promise = new Promise(function (resolve, reject) {
            if (adminArray) {
                var adminSelectElement = document.createElement("select");
                adminSelectElement.classList.add('responsible');

                var responsibleOption = document.createElement("option");
                responsibleOption.innerHTML = "&lt;Select&gt;";
                adminSelectElement.appendChild(responsibleOption);

                console.log("3. type: " + typeof(adminArray));

                adminArray.forEach(function (item) {
                    responsibleOption = document.createElement("option");
                    responsibleOption.innerHTML = item.username;
                    responsibleOption.value = item.id;
                    adminSelectElement.appendChild(responsibleOption);
                });
                adminSelect = adminSelectElement;
                resolve();
            }
            else {
                reject();
            }
        });
        return promise;
    }


    /**
     * moves element to a new parent node with animation
     * @param element either a JQuery object or selector
     * @param newParent either a JQuery object or selector
     */
    function moveAnimate(element, newParent){
        element = $(element); //Allow passing in either a JQuery object or selector
        newParent= $(newParent); //Allow passing in either a JQuery object or selector
        var oldOffset = element.offset();
        element.appendTo(newParent);
        var newOffset = element.offset();

        var temp = element.clone().appendTo('body');
        temp    .css('position', 'absolute')
            .css('left', oldOffset.left)
            .css('top', oldOffset.top)
            .css('zIndex', 1000);
        element.hide();
        temp.animate( {'top': newOffset.top, 'left':newOffset.left}, 'slow', function(){
            element.show();
            temp.remove();
        });
    }


    /**
     * delete task item from the list
     * @param taskID
     */
    function deleteItem (taskID){
        var element = document.getElementById(taskID);
        element.parentNode.removeChild(element);
    }


    document.getElementById('checkList').addEventListener('click', function(e){
        if(e.target.classList && e.target.classList.contains('check-completed')){
            var taskNode = e.target.parentNode;
            taskNode.getElementsByClassName('task-name')[0].style.setProperty('text-decoration', 'line-through');
            moveAnimate('#' + taskNode.id, "#completedList");
        }

        if(e.target.classList && e.target.classList.contains('delete-control')){
            var taskNode = e.target.parentNode;
            var taskID = taskNode.id;
            console.log("taskID = " + taskID);

            httpCall("GET", siteURL + "/admin/checklist_ajax.php",
                {'action': 'delete', 'taskID': taskID},
                function(response) {
                    deleteItem(taskID);
                }
            );
        }

    });


    var addTaskForm = document.getElementById('addTaskForm');
    addTaskForm.addEventListener('submit', function (e) {
        var taskNameInput = document.getElementById('addText');
		var taskName = taskNameInput.value;

        httpCall("GET", siteURL + "/admin/checklist_ajax.php",
            {'action': 'addItem', 'taskName': taskName},
            function(response) {
                addItem(response.itemID, taskName);
				taskNameInput.value = "";
				taskNameInput.focus();
            }
        );
		e.preventDefault();
        return false;
    });


    function getAdmins() {
        var promise = new Promise(function (resolve, reject) {
            httpCall("GET", siteURL + "/admin/checklist_ajax.php",
                {'action': 'getAdmins'},
                function (response) {
                    resolve(response.itemsData);
                },
                function (response) {
                    reject(response.itemsData);
                }
            )
        });
        return promise;
    }


    function getTasks() {
        var promise = new Promise(function (resolve, reject) {
            httpCall("GET", siteURL + "/admin/checklist_ajax.php",
                {'action': 'getItems'},
                function (response) {
                    resolve(response.itemsData);
                },
                function (response) {
                    reject(response.itemsData);
                }
            );
        });
        return promise;
    }

    function loadTasks() {
        getAdmins()
            .then(function(adminArray) {
                createAdminSelect(adminArray);
                return getTasks();
            })
            .then(function(tasksArray) {
                tasksArray.forEach(function(item) {
                    addItem(item.id, item.task_name);
                });
            })
    }

    loadTasks();

}