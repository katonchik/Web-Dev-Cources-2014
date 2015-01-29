/**
 * Defining an array to sort: ask the user for the array or generate one
 * @return {Array}
 */
var array = [];
(function generateRandomArray(n, q) {
    "use strict";

    n = n || 25;
    q = q || 100;
    for (var i = 0; i < n; i++) {
        array.push(Math.floor(Math.random() * q));
    }
    return array;
})();

document.write("Input array: " + array + "<br/>");

/**
 * Swapping two meanings
 * @param inputArray
 * @param firstElementIndex
 * @param secondElementIndex
 * @return inputArray
 */
function swap(inputArray, firstElementIndex, secondElementIndex) {
    "use strict";

    var temp = inputArray[firstElementIndex];
    inputArray[firstElementIndex] = inputArray[secondElementIndex];
    inputArray[secondElementIndex] = temp;
    return inputArray;
}