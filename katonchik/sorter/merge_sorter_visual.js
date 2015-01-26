/**
 * Created by user on 30.11.2014.
 */

/**
 *
 * @constructor
 */
MergeSorter.prototype.visualize = function() {
    alert("inside prototype");
    var canvas = document.createElement("div");
    document.body.appendChild(canvas);
    canvas.style.backgroundColor = "lightpink";
    canvas.style.height = "300px";
    canvas.style.position = "relative";
    canvas.style.border = '1px solid black';

    var colCount = this.sortedArray.length;
    var colWidth = Math.floor(100/colCount);
    for(var i=0; i<colCount; i++)
    {
        var column =  document.createElement("div");
        canvas.appendChild(column);
        column.style.backgroundColor = "lightblue";
        column.style.height = "300px";
        column.style.width = colWidth + "%";
        column.style.float = "left";
        column.style.border = '1px solid blue';
        column.innerHtml = this.sortedArray[i];
    }

    this.doSorting();
};
/*
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
*/
