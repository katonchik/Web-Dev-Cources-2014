/**
 * quick sort
 * @param arr
 */
function quickSort(arr) {
    var arr = arr.slice(),
        result;

    console.time('QuickSort time');

    function quickSortFunc(arr){
        if (arr.length == 0) return [];

        var pivot = arr[0],
            left = [],
            right = [],
            i = 1;

        for (i; i < arr.length; i+=1) {
            arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
        }

        return quickSortFunc(left).concat(pivot, quickSortFunc(right));
    }

    result = quickSortFunc(arr);
    console.timeEnd('QuickSort time');
    console.log('QuickSort output: ' + result);
}
