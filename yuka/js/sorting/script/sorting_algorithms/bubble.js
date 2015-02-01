define("sortBubble", ["helpers"], function(helpers) {
    "use strict";

    function sortBubble(data) {
        var newArray = data.slice(); //cloning array

        for (var j = newArray.length - 1; j > 0; j--) {
            for (var i = 0; i < newArray.length - 1; i++) {
                if (newArray[i] > newArray[i + 1]) {
                    helpers.swap(newArray, i, i + 1);
                }
            }
        }
        return newArray;
    }
    return sortBubble;
});