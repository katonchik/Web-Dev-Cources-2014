/**
 *  @param data {Array}
 * @return {Array} new sorted array
 */
//Quick sort
function sortQuick(data) {
    if (data.length < 2) {
        return data;
    }

    var pivot = data[0];
    var left = [];
    var right = [];
    for (var i = 1; i < data.length; i++) {
        if (data[i] >= pivot) {
            right.push(data[i]);
        }else{
            left.push(data[i]);
        }
    }
    return sortQuick(left).concat(pivot, sortQuick(right));
}

console.log("Quick sorted array: " + sortQuick(array));
