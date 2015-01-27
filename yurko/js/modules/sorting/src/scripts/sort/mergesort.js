define(["sort/merge", "sort/helpers"],
function (merge, helper) {

    // Merge sort function
    function mergesort(unsortedArray) {

        var orderedArray;

        var middleOfArray;
        var right = [];
        var left = [];
        var mergedArray = [];


//      Another way to clone array
        orderedArray = helper.copyArray(unsortedArray);
//        orderedArray = unsortedArray.clone();

        middleOfArray = parseInt(orderedArray.length / 2);
        if (orderedArray.length < 2) {
            return orderedArray;
        }
        else {
            left = orderedArray.slice(0, middleOfArray);
            right = orderedArray.slice(middleOfArray);

            left = mergesort(left);
            right = mergesort(right);

            mergedArray = merge(left, right);
        }


        return mergedArray;
    }
    return mergesort;
})