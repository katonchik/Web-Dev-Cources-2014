/**
 * Created by user on 30.11.2014.
 */

/**
 *
 * @constructor
 */
function SelectionSorter () {
    this.algorithmName = "Selection sort";
    this.doSorting = function(unsortedStr)
    {
        var firstUnsortedIndex = 0;
        for (var i = 0; i < this.sortedArray.length-1; i++) {
            var minimum = this.sortedArray[firstUnsortedIndex];
            var minimumIndex = firstUnsortedIndex;
            for(var j = firstUnsortedIndex; j < this.sortedArray.length; j++)
            {
                if(this.sortedArray[j] < minimum)
                {
                    minimumIndex = j;
                    minimum = this.sortedArray[j];
                }
            }

            if(this.sortedArray[i] > this.sortedArray[minimumIndex])
            {
                this.swap(i, minimumIndex);
            }
            firstUnsortedIndex++;
        }
    };
}

SelectionSorter.prototype = new ArraySorter();
