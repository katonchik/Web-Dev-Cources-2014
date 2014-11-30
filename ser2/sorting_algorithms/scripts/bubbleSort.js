/**
 * bubble sort
 * @param arr
 * @returns {*}
 */
function bubbleSort(arr) {
    var arr = arr.slice(),
        len = arr.length,
        i = 0;

    console.time('BubbleSort time');

    do {
        var swapped = false;
        for (i; i < len; i+=1) {
            if (arr[i] > arr[i + 1]) {
                swap(arr, i, i+1);
                swapped = true; // TODO: {Ser2} Fix it  (bubble sort do not work);
            }
        }
    } while (swapped == true);

    console.timeEnd('BubbleSort time');
    console.log('BubbleSort output: ' + arr);
    return arr;
}


