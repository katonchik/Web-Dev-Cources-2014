/**
 * Sorts input array using bubble algorithm.
 * @param array {Array}
 * @returns {Array}
 */
function bubbleSort(array){
    var newArray = array.slice();   // copy of new array
    console.time('bubbleSort');     // start timer
    for (var j = newArray.length-1; j > 0; j--) {
        for (var i = 0; i < newArray.length-1; i++) {
            if (newArray[i] > newArray[i+1]) {
                swap(newArray, i, i+1);
            }
        }
    }
    console.timeEnd('bubbleSort');  // end timer
    console.log('Bubble Sort: ' + newArray);
    return newArray;
}
