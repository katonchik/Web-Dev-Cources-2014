/**
 * Created by user on 30.11.2014.
 */

/**
 *
 * @constructor
 */
function BubbleSorter () {
    this.algorithmName = "Bubble sort";
    this.doSorting = function(unsortedStr)
    {
        do {
            var swapped = false;
            for (var i = 0; i < this.sortedArray.length; i++) {
                if (this.sortedArray[i] > this.sortedArray[i + 1]) {
                    this.swap(i, i + 1);
                    var swapped = true;
                }
            }
        }
        while (swapped == true);
    };
}

BubbleSorter.prototype = new ArraySorter();

