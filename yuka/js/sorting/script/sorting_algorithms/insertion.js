define("sortInsertion", ["helpers"], function(helpers) {
    "use strict";

    /**
     * @param data {Array}
     * @return newArray {Array}
     */
    function sortInsertion(data) {
        var newArray = data.slice(); //cloning array
        for (var i = 0; i < newArray.length; i++) {
            var smallest = newArray[i];
            var j = i - 1;
            while (j >= 0 && newArray[j] > smallest) {
                newArray[j + 1] = newArray[j];
                j--;
            }
            newArray[j + 1] = smallest;
        }
        return newArray;
    }
    return sortInsertion;
});