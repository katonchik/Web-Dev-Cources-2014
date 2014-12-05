/**
 * Sorts input array using injection algorithm. Returns sorted array.
 * @param arr {Array}
 * @returns {Array}
 */
function injectionSort(arr) {
    var newArr = arr.slice(), // create copy of input array
        sortedItem;

    console.time('InjectionSort time');  // start timer

    for (var i = 0 ; i < newArr.length ; i += 1) {
        sortedItem = newArr[i];
        for (var j = i - 1 ; j >= 0 && newArr[j] > sortedItem ; j -= 1) {
            newArr[j+1] = newArr[j];
        }
        newArr[j+1] = sortedItem;
    }

    console.timeEnd('InjectionSort time');  // end timer
    console.log('InjectionSort output: ' + newArr);  // show result
    return newArr;
}

