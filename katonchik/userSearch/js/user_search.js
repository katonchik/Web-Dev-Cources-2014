/**
 * Created by User on 25.01.2015.
 */


var searchInput = document.getElementById('searchName');

searchInput.addEventListener("keypress", function (e){
    setTimeout( function () {
        searchPlayers(searchInput.value);
    }, 1);
});

searchInput.addEventListener("keydown", function (e){
    var charCode = e.keyCode || e.which;
    if(charCode == 8) { //backspace
        setTimeout( function () {
            searchPlayers(searchInput.value);
        }, 1);
    }
    if (e.keyCode == 27) { //escape
        setTimeout( function () {
            cancelSearchPlayers();
        }, 1);
    }
});

searchInput.addEventListener("blur", function (e) {
    setTimeout(function () {
        cancelSearchPlayers();
    }, 300);
});



function searchPlayers(searchStr) {
    if(!searchStr) {
        console.log("canceled");
        cancelSearchPlayers();
    }
    else {
        httpCall("GET", "http://hat.frisbee.lviv.ua/admin/searchHelper.php",
            {'action': 'getItems', 'searchStr':searchStr},
            function(response) {
                renderSearchResults(response);
            }
        );

    }
}


function renderSearchResults(response) {
    var searchResultsContainer = document.getElementById('searchResults');
    while (searchResultsContainer.firstChild) {
        searchResultsContainer.removeChild(searchResultsContainer.firstChild);
    }
    if(!searchResultsContainer.classList.contains('searchResults--active')) {
        searchResultsContainer.classList.toggle('searchResults--active');
    }

    var source   = document.getElementById('searchResultsTemplate').innerHTML;
    var template = Handlebars.compile(source);
    searchResultsContainer.innerHTML = template(response);
}

function cancelSearchPlayers() {
    var searchResultsContainer = document.getElementById('searchResults');
    while (searchResultsContainer.firstChild) {
        searchResultsContainer.removeChild(searchResultsContainer.firstChild);
    }
    if(searchResultsContainer.classList.contains('searchResults--active')) {
        searchResultsContainer.classList.toggle('searchResults--active');
    }
}