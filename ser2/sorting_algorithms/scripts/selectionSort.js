/**
 * Sorts input array using selection algorithm. Returns sorted array.
 * @param arr {Array}
 * @returns {Array}
 */
function selectionSort(arr) {
    var newArr = arr.slice(),  // create copy of input array
        min;

    console.time('SelectionSort time');  // start timer

    for (var i = 0 ; i < newArr.length-1 ; i += 1) {
        min = i;
        for (var j = i + 1 ; j < newArr.length ; j += 1) {
            if (newArr[j] < newArr[min]) min = j;
        }
        swap(newArr, i, min);
    }

    console.timeEnd('SelectionSort time');  // end timer
    console.log('SelectionSort output: ' + newArr);  // show result
    return newArr;
}

