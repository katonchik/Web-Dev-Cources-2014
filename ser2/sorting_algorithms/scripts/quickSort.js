/**
 * Sorts input array using quick-sort algorithm. Returns sorted array.
 * @param arr {Array}
 * @returns {Array}
 */
function quickSort(arr) {
    var newArr = arr.slice(),  // create copy of input array
        result;

    console.time('QuickSort time');  // start timer

    function quickSortFunc(arr){
        if (arr.length == 0) return [];

        var pivot = arr[0],
            left = [],
            right = [];

        for (var i = 1 ; i < arr.length ; i += 1) {
            arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
        }

        return quickSortFunc(left).concat(pivot, quickSortFunc(right));
    }

    result = quickSortFunc(newArr);
    console.timeEnd('QuickSort time');  // end timer
    console.log('QuickSort output: ' + result);  // show result js_courses-sorting-algorithms
}
