/**
 * selection sort
 * @param arr
 * @returns {*}
 */
function selectionSort(arr) {
    var arr = arr.slice(),
        len = arr.length,
        temp,
        min,
        i = 0;

    console.time('SelectionSort time');

    for (i; i < len - 1; i+=1) {
        min = i;
        var j = i + 1;
        for (j; j < len; j+=1) {
            if (arr[j] < arr[min]) min = j;
        }
        swap(arr, i, min, temp);
    }

    console.timeEnd('SelectionSort time');
    console.log('SelectionSort output: ' + arr);
    return arr;
}

