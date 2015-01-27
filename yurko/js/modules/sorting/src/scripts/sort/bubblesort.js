define(["sort/helpers"], function (helper) {
// Bubblesorting
    function bubblesort(unsortedArray) {
        var orderedArray = unsortedArray;
        var i, j;

        for (i = 0; i < orderedArray.length - 1; i++) {

            for (j = 0; j < orderedArray.length - i - 1; j++) {

                if (orderedArray[j] > orderedArray[j + 1]) {
                    // TODO: Replace with swap function
                    orderedArray = helper.swap(orderedArray, j, j+1);
                }
            }
        }
        return orderedArray;
    }
    return bubblesort;
})
