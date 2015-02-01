define(["helpers"], function(helpers) {
    "use strict";

    /**
     * @param data {Array}
     * @return result {Array} new sorted array
     */
    function sortCounting (data) {
        var min = data[0],
            max = data[0],
            count = [],
            newArray = [],
            i;

        for (i=0; i < data.length; i++) {
            if (data[i] < min) {
                min = data[i];
            }
            if (data[i] > max) {
                max = data[i];
            }
        }

        for (i = min; i <= max + 2; i++) {
            count.push(0);
        }

        for (i = 0; i < data.length; i++) {
            count[data[i]] += 1;
        }

        for (i = 0; i < count.length+1; i++) {
            for (var j = 0; j < count[i]; j++) {
                newArray.push(i);
            }
        }
        return newArray;
    }
    return sortCounting;
});
