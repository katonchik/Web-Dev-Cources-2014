


var array = generaterator_random_number(10);

//Selection sorting
console.log("selection sort in", array);
function selection(array) {
    var min;
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

console.log("selection sort out", selection(array));