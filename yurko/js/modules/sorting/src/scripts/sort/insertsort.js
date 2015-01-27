define([], function () {

    // Insert sort function
    function insertsort(unsortedArray) {
        var orderedArray = unsortedArray;
        var buffer, i, j;

        for (i = 0; i < orderedArray.length - 1; i++) {
            buffer = orderedArray[i];

            for (j = i - 1; j >= 0 && orderedArray[j] > buffer; j--) {
                orderedArray[j + 1] = orderedArray[j];
            }

            orderedArray[j + 1] = buffer;
        }
        return orderedArray;
    }
    return insertsort;
})