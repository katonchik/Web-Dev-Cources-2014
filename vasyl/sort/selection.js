/**
 * Created by ad on 11.11.14.
 */
//Random generator


var array = generaterator_random_number(7);
var min;
//Selection sorting
console.log("selection sort in", array);
function selection(array) {
    for (var i = 0; i < array.length; i++) {
        min = i;
        for (var j = i; j < array.length; j++) {
            if (array[min] > array[j]) {
                min = j;
            }
        }
        swap(array, min, i);
    }
    return array;
}
selection(array);
console.log("selection sort out", array);