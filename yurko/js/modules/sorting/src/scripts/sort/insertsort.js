define([], function () {

    // Insert sort function
    function insertsort(unsortedArray) {
        var orderedArray;
        var buffer, i, j;

        orderedArray = unsortedArray.clone();
//      Another way to clone array
//      orderedArray = helper.copyArray(unsortedArray);

        for (i = 0; i < orderedArray.length; i++) {
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