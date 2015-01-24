window.onload = function() {
    /**
     * @param data
     * @returns {HTMLElement}
     */
    function render(data) {
        var div = document.createElement("div");
        div.className = 'array-element';
        div.style.height = data + "px";
        return div;
    }

    var sortArray = generateRandomArray(25);

    var section = document.getElementsByClassName("sort-visualization")[0];

    sortArray.map(render).forEach(function(arrayData) {
        section.appendChild(arrayData);
    });

    /**
     * Redraws array after one step of sort
     * @param data
     */
    function drawEverything(data) {
        var sortedArray = data.map(render);
        section.innerHTML = "";
        sortedArray.forEach(function(node, j) {
            if (j < i) {
                node.classList.add('array-element--sorted')
            }
            if (j === i) {
                node.classList.add('current')
            } else {
                node.classList.remove('current')
            }
            section.appendChild(node);
        });
    }

    var sortingInterval = null;

    document.getElementsByClassName("start-sorting")[0].addEventListener("click", function() {
        if (sortingInterval) {
            return;
        }
        sortingInterval = setInterval(function() {
            var stepArray = sortInsertion(sortArray);
            if (stepArray) {
                drawEverything(stepArray);
            } else {
                drawEverything(sortArray);
                clearInterval(sortingInterval);
                sortingInterval = null;
            }
        }, 400);
    });

    document.getElementsByClassName("refresh")[0].addEventListener("click", function() {
        sortArray = generateRandomArray(25);
        resetSortInsertion();
        drawEverything(sortArray);
    });
};