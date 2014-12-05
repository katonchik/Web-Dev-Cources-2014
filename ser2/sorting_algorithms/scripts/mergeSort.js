/**
 * Sorts input array using merge algorithm. Returns sorted array.
 * @param arr {Array}
 * @return {Array}
 */
function mergeSort(arr) {
    var newArr = arr.slice(),  // create copy of input array
        result;

    function mergeSortFunc(arr) {
        if (arr.length < 2) return arr;

        var mid = Math.floor(arr.length / 2),
            left = arr.slice(0, mid),
            right = arr.slice(mid);

        return merge(mergeSortFunc(left), mergeSortFunc(right));
    }

    /**
     * Merges Two Arrays
     * @param leftPart {Array}
     * @param rightPart {Array}
     * @returns {Array}
     */
    function merge(leftPart, rightPart) {
        var result = [];

        while (leftPart.length && rightPart.length) {
            leftPart[0] < rightPart[0] ? result.push(leftPart.shift()) : result.push(rightPart.shift());
        }
        result = result.concat(leftPart).concat(rightPart);
        return result;
    }

    console.time('MergeSort time');  // start timer
    result = mergeSortFunc(newArr);
    console.timeEnd('MergeSort time');  // end timer
    console.log('MergeSort output: ' + result);  // show result
}


