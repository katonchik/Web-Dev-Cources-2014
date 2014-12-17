/**
 * @param data {Array}
 * @return newArray {Array}
 */

function sortInsertion(data) {
    for (var i = 0; i < data.length; i++) {
       var smallest = data[i];
       var j = i - 1;
       while (j >= 0 && data[j] > smallest) {
           data[j + 1] = data[j];
           j--;
       }
       data[j + 1] = smallest;
   }
   return data;
}