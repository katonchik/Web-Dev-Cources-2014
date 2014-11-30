/**
 * Return new sorted array.
 * @param arr {Array}
 * @return {Array}
 */
function mergeSort(arr) {
    var arr = arr.slice(),
        result;

    function mergeSortFunc(arr) {
        if (arr.length < 2) return arr;

        var mid = Math.floor(arr.length / 2),
            left = arr.slice(0, mid),
            right = arr.slice(mid);

        return merge(mergeSortFunc(left), mergeSortFunc(right));
    }

    /**
     * merges two arrays
     * @param leftPart
     * @param rightPart
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

    console.time('MergeSort time');
    result = mergeSortFunc(arr);
    console.timeEnd('MergeSort time');
    console.log('MergeSort output: ' + result);
}


