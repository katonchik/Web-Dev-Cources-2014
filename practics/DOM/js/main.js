window.onload = function () {
  function renderUser(userData) {
    var li = document.createElement("li");
    li.innerHTML = "<img src='" + userData.avatar + "' class='avatar'>" + userData.name;

    li.innerHTML += '<i class="remove-user fa fa-times"></i>';
    li.style.color = userData.color;

    li
      .querySelector(".remove-user")
      .addEventListener("click", function () {
        li.parentNode.removeChild(li);
      });
    return li;
  }

//Generate data Array
  var users = Array (10);

  for (var i = 0 ; i <  users.length ; i += 1) {
    users[i] = {
      name : faker.name.findName() ,
      avatar : faker.internet.avatar(),
      color : faker.internet.color()
    };
  }

//Render data view
  var ul = document.createElement("ul");

  var li = users
    .map(renderUser)
    .forEach(function (liNode) {
      ul.appendChild(liNode);
    });

  document
    .getElementById("userList")
    .appendChild(ul);

  document
    .getElementById("sortUsers")
    .addEventListener("click", function (e) {
      users.sort(function (a, b) {
        return a.name > b.name;
      });
      usersList = users.map(renderUser);

      ul.innerHTML  = "";

      usersList
        .forEach(function (liNode) {
          ul.appendChild(liNode);
        })
    })
};