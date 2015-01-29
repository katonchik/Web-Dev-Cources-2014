/**
 * @param data {Array}
 * @return newArray {Array}
 */
function sortSelection(data) {
    "use strict";

    var newArray = data.slice(); //cloning array
    for (var i = 0; i < newArray.length-1; i++) {
        var min = i;
        for (var j = i + 1; j < newArray.length; j++) {
            if (newArray[j] < newArray[min])
                min = j;
        }
        swap(newArray, min, i);
    }
    return newArray;
}

document.write("Selection sorted array: " + sortSelection(array) + "<br/>");
