define(["helpers"], function(helpers) {
    "use strict";

    /**
     * @param data {Array}
     * @return result {Array} new sorted array
     */
    function sortQuickRandom(data) {
        if (data.length < 2) {
            return data;
        }

        var pivotIndex = Math.floor(Math.random()*data.length),
            pivot = data[pivotIndex],
            left = [],
            right = [];

        for (var i=0; i < data.length; i++) {
            if (i === pivotIndex) {
                continue;
            }
            
            if (data[i] >= pivot) {
                right.push(data[i]);
            }else{
                left.push(data[i]);
            }
        }

        return sortQuickRandom(left).concat(pivot, sortQuickRandom(right));
    }

    return sortQuickRandom;
});

