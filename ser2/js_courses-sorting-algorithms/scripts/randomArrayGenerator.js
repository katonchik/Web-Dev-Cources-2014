// Global Array
var arr;

/**
 *  Generates Random Array
 * @param items
 * @returns {Array}
 */
function generateRandomArray(n) {
    var items = n || 15,
        randomArr = [],
        i = 0;

    for (i;i<items;i+=1) {
        randomArr.push(Math.floor(Math.random()*100));
    }

    return randomArr;
}

arr = generateRandomArray();
console.log('Your input array is: ' + arr);