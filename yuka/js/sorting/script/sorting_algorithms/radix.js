/**
 * @param data {Array}
 * @param radix {Number}
 * @return {Array} new sorted array
 */
function sortRadix (data, radix) {
    "use strict";

    if (radix === undefined) {
        radix = 100;
    }
    if (data.length < 2) {
        return data;
    }
    if (radix === 0) {
        return data;
    }
    var left = [];
    var right = [];
    var mod = Math.pow(2, radix);
    var div = Math.pow(2, radix-1);
    for (var i =0; i < data.length; i++) {
        if ((data[i] % mod) / div < 1) {
            left.push(data[i]);
        }else{
            right.push(data[i]);
        }
    }
    return sortRadix(left, radix - 1).concat(sortRadix(right, radix-1));
}

document.write("Radix sorted array: " + sortRadix(array) + "<br/>");
