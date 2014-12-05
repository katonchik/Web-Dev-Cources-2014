/**
 *  Generates Random Array
 * @param arrayLength
 * @returns {Array}
 */
function generateRandomArray(arrayLength) {
    var randomArr = [];

    arrayLength = arrayLength || 15;

    for (i = 0 ; i < arrayLength; i += 1) {
        randomArr.push(Math.floor(Math.random()*100));
    }

    return randomArr;
}

/**
 * Swaps two elements in array.
 * @param inputArray {Array}
 * @param firstElementIndex {Number}
 * @param secondElementIndex {Number}
 * @return {Array}
 */
function swap(inputArray, firstElementIndex, secondElementIndex) {
    var temp;
    firstElementIndex = parseInt(firstElementIndex);
    secondElementIndex = parseInt (secondElementIndex);

    temp = inputArray[firstElementIndex];
    inputArray[firstElementIndex] = inputArray[secondElementIndex];
    inputArray[secondElementIndex] = temp;

    return inputArray;
}