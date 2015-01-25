define([], function (){
    /**
     * Defining an array to sort: ask the user for the array or generate one
     * @return {Array}
     */

    function generateRandomArray(arrayLength, numberRange) {
        var array = [];

        arrayLength = arrayLength || 25;
        numberRange = numberRange || 100;
        var i;
        for (i = 0; i < arrayLength; i++) {
            array.push(Math.floor(Math.random() * numberRange));
        }
        return array;
    }

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

    return {
        generateRandomArray: generateRandomArray,
        swap: swap
    }
});