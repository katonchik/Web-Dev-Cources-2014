var i = 0;

/**
 * @param data {Array}
 * @return Array {Array}
 */
function sortInsertion(data) {
    var smallest = data[i];
    var j = i - 1;
    while (j >= 0 && data[j] > smallest) {
        data[j + 1] = data[j];
        j--;
    }
    data[j + 1] = smallest;
    i++;
    if (i >= data.length) {
        return null;
    }
   return data;
}

function resetSortInsertion() {
    i=0;
}