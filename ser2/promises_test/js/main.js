define([], function(){
    'use strict';

    var container = document.getElementById('Container');
    var promiseCount = 0;

    function getData(url) {
        var promiseTest = new Promise(function(resolve, reject){

            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 404) {
                        reject(xhr.responseText);
                        renderData('No data found!!!');
                    } else if (xhr.status === 200) {
                        var data = JSON.parse(xhr.responseText);
                        resolve(data);
                        renderData(data.data);
                    }
                }
            };

            xhr.send();

        });

        promiseCount += 1;
        console.log(promiseCount);
        return promiseTest;
    }

    function renderData(data){
        var newEl = document.createElement('div');
        newEl.innerHTML = data;
        container.appendChild(newEl);

        return container;
    }

    document.getElementById('test').addEventListener('click', function (e) {
        e.preventDefault();
        getData('/promises_test/js/data1.js').then(function () {
            getData('/promises_test/js/data2.js');
        }).then(function () {
            getData('/promises_test/js/data3.js');
        });
    });
});
