/**
 *  Generates Random Array
 * @param arrayLength
 * @returns {Array}
 */
function generateRandomArray(arrayLength) {
    var randomArr = [],
      i = 0;

    arrayLength = arrayLength || 15;

    for (i ; i < arrayLength; i += 1) {
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
    firstElementIndex = parseInt(firstElementIndex);
    secondElementIndex = parseInt (secondElementIndex);

    var temp = inputArray[firstElementIndex];
    inputArray[firstElementIndex] = inputArray[secondElementIndex];
    inputArray[secondElementIndex] = temp;

    return inputArray;
}