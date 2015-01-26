/**
 * Created by user on 30.11.2014.
 */

/**
 *
 * @constructor
 */
function MergeSorter () {
    this.algorithmName = "Merge sort";
    this.doSorting = function() {
        this.sortedArray = mergeSort(this.sortedArray);
    };
    
    function mergeSort(array){
        var length = array.length,
            mid    = Math.floor(length * 0.5),
            left   = array.slice(0, mid),
            right  = array.slice(mid, length);

        if(length === 1) {
            return array;
        }

        return merge(mergeSort(left), mergeSort(right));
    }

    function merge(left, right){
        var result = [];

        while(left.length || right.length) {

            if(left.length && right.length) {

                if(left[0] < right[0]) {
                    result.push(left.shift());
                } else {
                    result.push(right.shift());
                }

            } else if (left.length) {
                result.push(left.shift());
            } else {
                result.push(right.shift());
            }

        }

        return result;

    }


}

MergeSorter.prototype = new ArraySorter();

