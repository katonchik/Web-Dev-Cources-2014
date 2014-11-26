/**
 * injection sort
 * @param arr
 * @returns {*}
 */
function injectionSort(arr) {
    var arr = arr.slice(),
        len = arr.length,
        sortedItem,
        i = 0;

    console.time('InjectionSort time');

    for (i; i < len;i+=1) {
        sortedItem = arr[i];
        var j = i - 1;
        for (j; j >= 0 && arr[j] > sortedItem; j-=1) {
            arr[j+1] = arr[j];
        }
        arr[j+1] = sortedItem;
    }

    console.timeEnd('InjectionSort time');
    console.log('InjectionSort output: ' + arr);
    return arr;
}