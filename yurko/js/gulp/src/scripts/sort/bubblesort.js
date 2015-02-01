define(["sort/helpers"], function (helper) {
// Bubblesorting
    function bubblesort(unsortedArray) {
        var orderedArray;
        var i, j;

        orderedArray = unsortedArray.clone();
//      Another way to clone array
//      orderedArray = helper.copyArray(unsortedArray);

        for (i = 0; i < orderedArray.length - 1; i++) {

            for (j = 0; j < orderedArray.length - i - 1; j++) {

                if (orderedArray[j] > orderedArray[j + 1]) {
                    orderedArray = helper.swap(orderedArray, j, j+1);
                }
            }
        }
        return orderedArray;
    }
    return bubblesort;
})
