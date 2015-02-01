define(["helpers"], function(helpers) {
    "use strict";

    /**
     * @param data {Array}
     * @return result {Array} new sorted array
     */
    function sortQuick(data) {

        if (data.length < 2) {
            return data;
        }

        var pivot = data[0],
            left = [],
            right = [];

        for (var i = 1; i < data.length; i++) {
            if (data[i] >= pivot) {
                right.push(data[i]);
            }else{
                left.push(data[i]);
            }
        }

        return sortQuick(left).concat(pivot, sortQuick(right));
    }

    return sortQuick;
});

