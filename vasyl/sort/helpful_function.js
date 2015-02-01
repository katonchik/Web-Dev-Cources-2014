/**
 * generete random array
 * @param n -length of array
 * @returns {Array}
 */
function generaterator_random_number(n) {
    var array = [];
    n = n || 10;

    for (var i = 0; i < n; i++) {
        array.push(Math.round(Math.random() * 100));
    }
    return array;
}

//arr = generatorRandomNumber(20);
//Swap function
function swap(array, swap_index_1, swap_index_2) {
    var el = array[swap_index_1];
    array[swap_index_1] = array[swap_index_2];
    array[swap_index_2] = el;
}
/**
 * Created by ad on 30.11.14.
 */
