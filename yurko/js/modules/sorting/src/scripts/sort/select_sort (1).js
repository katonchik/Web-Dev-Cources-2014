define(["sort/helpers"], function (helper) {
        // Selection sort function
        function selectSort(unsortedArray){
            var orderedArray;
            var i,
                j,
                minArrayElement;
//      Another way to clone array
//            orderedArray = helper.copyArray(unsortedArray);
            orderedArray = unsortedArray.clone();

            for (i = 0; i < orderedArray.length - 1; i++) {
                minArrayElement = i;
                for (j = i + 1; j < orderedArray.length; j++) {
                    if (orderedArray[minArrayElement] > orderedArray[j]) {
                        minArrayElement = j;
                    }
                }

                if (minArrayElement != i) {
                    orderedArray = helper.swap(orderedArray, i , minArrayElement);
                }
            }
            return orderedArray;
        }
    return selectSort;
    })