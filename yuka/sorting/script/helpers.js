/**
 * Defining an array to sort: ask the user for the array or generate one
 * @return {Array}
 */
var array = [];

(function defineArray() {
    var answer = prompt('Have an array to sort?');

    if (!answer) {
        var n = prompt('What number of elements you want?');
        generateRandomArray(n);
    }else{
        array = answer.split(' ').map(parseFloat);
    }

    function generateRandomArray(n, q) {
        n = n || 25;
        q = q || 100;

        for (var i = 0; i < n; i++) {
            array.push(Math.floor(Math.random() * q));
        }
        return array;
    }

    return array;
})();

console.log("Input array: " + array);

/**
 * Swapping two meanings
 * @param inputArray
 * @param firstElementIndex
 * @param secondElementIndex
 * @return inputArray
 */
function swap(inputArray, firstElementIndex, secondElementIndex) {
    var temp = inputArray[firstElementIndex];
    inputArray[firstElementIndex] = inputArray[secondElementIndex];
    inputArray[secondElementIndex] = temp;

    return inputArray;
}