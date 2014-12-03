/**
 * Sorts input array using bubble algorithm. Returns sorted array.
 * @param arr {Array}
 * @returns {Array}
 */
function bubbleSort(arr) {
    var newArr = arr.slice();  // create copy of input array

    console.time('BubbleSort time');  // start timer

    for (var i = newArr.length-1 ; i >= 0 ; i -= 1){
        for (var j = newArr.length-1 ; j >= 0 ; j-=1){
            if (newArr[j] < newArr[j-1]){
                swap(newArr, j, j-1);
            }
        }
    }

    console.timeEnd('BubbleSort time');  // end timer
    console.log('BubbleSort output: ' + newArr);  // show result
    return newArr;
}


