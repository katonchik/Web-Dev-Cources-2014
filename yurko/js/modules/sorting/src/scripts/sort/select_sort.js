define(["sort/helpers"], function (helper) {

        function selectSort(unsortedArray){
            var orderedArray = unsortedArray;
            var i,
                j,
                minArrayElement;

            for (i = 0; i < orderedArray.length - 1; i++) {
                minArrayElement = i;
                for (j = i + 1; j < orderedArray.length; j++) {
                    if (orderedArray[minArrayElement] > orderedArray[j]) {
                        minArrayElement = j;
                    }
                }

                if (minArrayElement != i) {
                    //TODO: Replace with swap function
                    //            var tmp = orderedArray[i];
                    //            orderedArray[i] = orderedArray[minArrayElement];
                    //            orderedArray[minArrayElement] = tmp;
                    helper.swap(orderedArray, i , minArrayElement);
                }
            }
            return orderedArray;
        }
    })