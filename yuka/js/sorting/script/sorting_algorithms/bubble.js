/**
 * @param data {Array}
 * @return {Array} returns new sorted array
 */
function sortBubble(data) {
    "use strict";

    var newArray = data.slice();

    for (var j = newArray.length - 1; j > 0; j--) {
        for (var i = 0; i < newArray.length - 1; i++) {
            if (newArray[i] > newArray[i + 1]) {
                swap(newArray, i, i + 1);
            }
        }
    }
    return newArray;
}

document.write("Bubble sorted array: " + sortBubble(array) + "<br/>");