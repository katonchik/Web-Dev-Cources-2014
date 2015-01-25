var inputArray = {
    inArr: []
}

inputArray.generate = function() {
    for (var y = 0, n = 30; y < 20; y++) {
        inputArray.inArr.push(Math.round(Math.random() * n))
    };
    console.log(inputArray.inArr);
    inputArray.display();
};

inputArray.display = function() {
    var canvas = document.querySelector('div.array_block');
    var rootEl = document.createElement("div");

    for (var i = 0; i < inputArray.inArr.length; i++) {
        var columnHeight = 10*inputArray.inArr[i];
        var column = document.createElement('div');
        column.className = "column";
        column.style.height = columnHeight + 'px';
        column.innerHTML = '<span>' + inputArray.inArr[i] + '</span>';
        
        console.log(column);

        rootEl.appendChild(column);

    }

    canvas.appendChild(rootEl);
};


//Event listeners
(function() {

    var generateButton = document.getElementById('generate'),
        sortButton = document.getElementById('sort');

    generateButton.addEventListener('click', inputArray.generate, false)
    sortButton.addEventListener('click', inputArray.sort, false);

})();


