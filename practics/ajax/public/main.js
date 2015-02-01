function getTemplate (){
  var promise = new Promise(function (resolve, reject){

    var xhr = new XMLHttpRequest();
    xhr.open("GET", '/public/template.hbs');

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 404) {
          reject(xhr.responseText);
        } else if (xhr.status === 200) {
          resolve(xhr.responseText);
        }
      }
    };

    ontimeout = function (err){ reject(err); };
    xhr.send();

  });

  return promise
      .then(function (templateString){
        return Handlebars.compile(templateString);
      })
      .catch(function (err){
        console.error("Error!!!", err);
      });
}

function renderUsers(container, data, template) {
    var html =  data.users.map(function (el) {
      return template(el);
    });

    container.innerHTML = `<ul>${html.join("")}</ul>`;
};

function loadUsers (from, to) {
  var promise = new Promise(function (resolve, reject){

    var xhr = new XMLHttpRequest();
    xhr.open("GET", `/users.json?from=${from}&to=${to}`);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var data = JSON.parse(xhr.responseText);
        resolve(data);
      };
    };
    xhr.send();
  });

  return promise;
}

Promise.all([loadUsers(0, 10), getTemplate()])
  .then(function (data){
      var usersContainer = document.getElementById("userList");
      renderUsers(usersContainer, data[0], data[1]);
  });

document.getElementById("pager")
  .addEventListener("click", function (e) {
    if (e.target.classList.contains("pager__page")) {
      var page = parseInt(e.target.innerHTML, 10) - 1;
      var from = page * 10;

      loadUsers(from, from + 10)
        .then(function (data) {
          var usersContainer = document.getElementById("userList");
          renderUsers(usersContainer, data);
        })
    }
  })



