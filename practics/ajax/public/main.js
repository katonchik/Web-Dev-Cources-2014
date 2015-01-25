function renderUsers(container, data) {
  var html =  data.users.map(function (el) {

    var template = `
      <li>${el.index} ${el.firstName} ${el.lastName}</li>
    `;
    return template;
  });

  container.innerHTML = `<ul>${html.join("")}</ul>`;
}

function loadUsers (from, to, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `/users.json?from=${from}&to=${to}`);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);
      callback (data);
    };
  };

  xhr.send();
}

loadUsers(0, 10, function (data) {
  var usersContainer = document.getElementById("userList");
  renderUsers(usersContainer, data);
})

document.getElementById("pager")
  .addEventListener("click", function (e) {
    if (e.target.classList.contains("pager__page")) {
      var page = parseInt(e.target.innerHTML, 10) - 1;
      var from = page * 10;

      loadUsers(from, from + 10, function (data) {
        var usersContainer = document.getElementById("userList");
        renderUsers(usersContainer, data);
      })

    }
  })



