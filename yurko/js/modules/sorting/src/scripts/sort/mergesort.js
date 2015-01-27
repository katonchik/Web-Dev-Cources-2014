define(["sort/merge"],
function (merge) {

    // Merge sort function
    function mergesort(unsortedArray) {

        var orderedArray = unsortedArray;
        var middleOfArray = parseInt(orderedArray.length / 2);
        var right = [];
        var left = [];
        var mergedArray = [];

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