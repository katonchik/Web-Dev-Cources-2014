/**
 * Created by ad on 11.11.14.
 */
var numbers = generaterator_random_number(10);

console.log("Randomized quick sort inn", numbers);

//Randomized quick sorting

function sortQuickRandom(array) {
    if (array.length < 2) {
        return array;
    }

    var pivotIndex = Math.floor(Math.random()*array.length);
    var pivot = array[pivotIndex];
    var left = [];
    var right = [];
    for (i=0; i < array.length; i++) {
        if (i === pivotIndex) {
            continue;
        }
        if (array[i] >= pivot) {
            right.push(array[i]);
        }else{
            left.push(array[i]);
        }
    }
    return sortQuickRandom(left).concat(pivot, sortQuickRandom(right));
}

console.log("Randomized quick sort out", sortQuickRandom(numbers));