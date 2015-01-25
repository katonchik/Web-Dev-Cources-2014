/**
 * @param n {Number} count of elements
 * @param q {Number} diapason
 * @returns {Array}
 */
function generateRandomArray(n, q) {
    var array = [];

    n = n || 25;
    q = q || 100;

    for (var i = 0; i < n; i++) {
        array.push(Math.floor(Math.random() * q));
    }
    return array;
}