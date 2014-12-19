/**
 * @param n {Number} count of numbers
 * @param q {Number} diapason
 * @returns {array|*}
 */
function randomArray(n, q) {
    n = n || 25;
    q = q || 100;

    for (var i = 0; i < n; i++) {
        array.push(Math.floor(Math.random() * q));
    }

    return array;
}
