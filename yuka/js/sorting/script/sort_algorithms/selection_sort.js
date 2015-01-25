/**
 * @param data {Array}
 * @return newArray {Array}
 */

function sortSelection(data) {
    var newArray = data.slice(); //cloning array

    for (var i = 0; i < newArray.length-1; i++) {
        var min = i;
        for (var j = i + 1; j < newArray.length; j++) {
            if (newArray[j] < newArray[min])
                min = j;
        }
        swap(newArray, min, i);
    }
    return newArray;
}

console.log("Selection sorted array: " + sortSelection(array));
