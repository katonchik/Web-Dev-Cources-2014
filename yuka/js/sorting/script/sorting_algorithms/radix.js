define(["helpers"], function(helpers) {
    "use strict";

    /**
     * @param data {Array}
     * @return result {Array} new sorted array
     */
    function sortRadix (data, radix) {
        if (radix === undefined) {
            radix = 100;
        }

        if (data.length < 2) {
            return data;
        }

        if (radix === 0) {
            return data;
        }

        var left = [],
            right = [],
            mod = Math.pow(2, radix),
            div = Math.pow(2, radix-1);

        for (var i =0; i < data.length; i++) {
            if ((data[i] % mod) / div < 1) {
                left.push(data[i]);
            }else{
                right.push(data[i]);
            }
        }

        return sortRadix(left, radix - 1).concat(sortRadix(right, radix-1));
    }

    return sortRadix;
});

