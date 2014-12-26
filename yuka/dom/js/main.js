window.onload = function () {
    /**
     * @param data
     * @returns {HTMLElement}
     */
    function render (data) {
        var div = document.createElement("div");
        div.className = 'array-element';
        div.style.height = data + "px";
        return div;
    }

    /**
     * @param data {Array}
     * @return Array {Array}
     */
    function sortInsertion(data) {
        for (var i = 0; i < data.length; i++) {
            var smallest = data[i];


            var j = i - 1;
            while (j >= 0 && data[j] > smallest) {
                data[j + 1] = data[j];
                j--;
            }
            data[j + 1] = smallest;
        }
        return data;
    }

    var newArray = generateRandomArray(25);

    var section = document.getElementsByClassName("sort-visualization")[0];

    newArray.map(render).forEach(function(arrayData) {
        section.appendChild(arrayData);
    });

    document.getElementsByClassName("start-sorting")[0].addEventListener("click", function() {
        sortInsertion(newArray);
        var sortedArray = newArray.map(render);

        section.innerHTML = "";

        sortedArray.forEach(function(node) {
            section.appendChild(node);
        });
    });
};

