/**
 * @param data {Array}
 * @return result {Array}
 */

function sortMerge(data) {
    if (data.length < 2) {
        return data;
    }

    function merge (left, right) {
        var result = [];
        var il = 0;
        var ir = 0;

        while (il < left.length && ir < right.length) {
            if (left[il] < right[ir]) {
                result.push(left[il++]);
            }else{
                result.push(right[ir++]);
            }
        }
        return result.concat(left.slice(il)).concat(right.slice(ir));
    }

    var middle = Math.floor(data.length / 2);
    var left = data.slice(0, middle);
    var right = data.slice(middle);

    return merge(sortMerge(left), sortMerge(right));
}

console.log("Merge sorted array: " + sortMerge(array));
