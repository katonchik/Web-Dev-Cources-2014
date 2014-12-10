function addButtonEvents(param) {

    var button = document.getElementById('sortItButton');
    button.addEventListener('click', function() { sortArray(param) }, false);
}