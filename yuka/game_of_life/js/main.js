/**
 * Created by yuka on 09.01.15.
 */
var model;
var drawInterval;

function initField() {
    // stop animation
    if (drawInterval) {
        clearInterval(drawInterval);
        drawInterval = null;
    }
    var x = 25;
    var y = 25;
    var field = document.getElementsByClassName('life__table')[0];
    model = [];
    field.style.height = (y * 20) + 'px';
    field.style.width = (x * 20) + 'px';
    field.innerHTML = '';
    for (var i = 0; i < y; i++) {
        var row = document.createElement('tr');
        var modelRow = [];
        for (var j = 0; j < x; j++) {
            var cell = document.createElement('td');
            cell.classList.add('life__cell');
            cell.id = 'cell_' + i + '_' + j;
            row.appendChild(cell);
            modelRow.push(false);
        }
        field.appendChild(row);
        model.push(modelRow);
    }
}

function toggleCell(ev){
    var el = ev.target;
    if (!el || !el.id || !el.classList.contains('life__cell')) {
        return;
    }
    var coords = el.id.split('_');
    var y = coords[1];
    var x = coords[2];

    model[y][x] = !model[y][x];
    if (el.classList.contains('alive')) {
        el.classList.remove('alive');
        el.classList.remove('wasalive');
        el.classList.add('dead');
    } else {
        el.classList.remove('dead');
        el.classList.add('alive');
        el.classList.add('wasalive');
    }
}

function drawStep() {
    model.forEach(function(row, y){
        row.forEach(function(cell, x){
            var cellEl = document.querySelector('#cell_' + y + '_' + x);
            if (cell) {
                cellEl.classList.add('alive');
                cellEl.classList.add('wasalive');
                cellEl.classList.remove('dead');
            } else {
                cellEl.classList.add('dead');
                cellEl.classList.remove('alive');
            }
        });
    });
}

function calculateStep() {
    var newModel = [];
    model.forEach(function(row, y){
        var newRow = [];
        row.forEach(function(cell, x){
            newRow.push(isAlive(cell, x , y));
        });
        newModel.push(newRow);
    });
    model = newModel;
    drawStep();
}

function isAlive(wasAlive, x, y) {
    var sum = 0;
    sum += endlessModel(y-1, x-1);
    sum += endlessModel(y, x-1);
    sum += endlessModel(y+1, x-1);

    sum += endlessModel(y-1, x);
    sum += endlessModel(y+1, x);

    sum += endlessModel(y-1, x+1);
    sum += endlessModel(y, x+1);
    sum += endlessModel(y+1, x+1);

    if (wasAlive) {
        return sum === 2 || sum === 3;
    } else {
        return sum === 3;
    }
}

function endlessModel(y, x) {
    var rx = (model[0].length + x) % model[0].length;
    var ry = (model.length + y) % model.length;
    return model[ry][rx];
}

document.querySelector('#init-button').addEventListener('click', initField);
document.querySelector('#pause-button').addEventListener('click', function() {
    if (drawInterval) {
        clearInterval(drawInterval);
        drawInterval = null;
    } else {
        drawInterval = setInterval(calculateStep, 50);
    }
});

var field = document.getElementsByClassName('life__table')[0];
field.addEventListener('click', toggleCell);
field.addEventListener('mousedown', function(){
    field.addEventListener('mousemove', toggleCell);
    field.addEventListener('mouseup', function(){
        field.removeEventListener('mousemove', toggleCell);
    });
});
initField();
