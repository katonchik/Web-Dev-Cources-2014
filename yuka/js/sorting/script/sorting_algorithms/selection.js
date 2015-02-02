define(["helpers"], function(helpers) {
    "use strict";

    /**
     * @param data {Array}
     * @return result {Array} new sorted array
     */
    function sortSelection(data) {
        var newArray = data.slice(); //cloning array

        for (var i = 0; i < newArray.length - 1; i++) {
            var min = i;

            for (var j = i + 1; j < newArray.length; j++) {
                if (newArray[j] < newArray[min]) {
                    min = j;
                }

                if (min !== i) {
                    helpers.swap(newArray, min, i);
                }
            }
        }

        return newArray;
    }
    return sortSelection;
});


