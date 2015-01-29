/**
 * @param data {Array}
 * @return {Array} new sorted array
 */
function sortQuickRandom(data) {
    "use strict";

    if (data.length < 2) {
        return data;
    }
    var pivotIndex = Math.floor(Math.random()*data.length);
    var pivot = data[pivotIndex];
    var left = [];
    var right = [];
    for (i=0; i < data.length; i++) {
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

document.write("Random quick sorted array: " + sortQuickRandom(array) + "<br/>");
