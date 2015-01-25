/**
 * Created by user on 30.11.2014.
 */

ArraySorter = function () {
    this.sortAlgorithmName = "";
    this.sortedArray = [];
    this.doSorting;
    this.makeIntArray = function(unsortedStr)
    {
        var strArray = unsortedStr.split(",");
        for(var i=0; i<strArray.length; i++) {
            this.sortedArray[i] = parseInt(strArray[i]);
        }
        //return this.sortedArray;
    };
    this.swap = function(elementIndexOne, elementIndexTwo)
    {
        var tmp = this.sortedArray[elementIndexOne];
        this.sortedArray[elementIndexOne] = this.sortedArray[elementIndexTwo];
        this.sortedArray[elementIndexTwo] = tmp;
    };
    this.sort = function(unsortedStr)
    {
        this.makeIntArray(unsortedStr);
        console.time('sort');
        if(this.visualize !== undefined){
            this.visualize();
        }
        else
        {
            this.doSorting();
        }
        console.timeEnd('sort');
        return this.sortedArray.join(",");
    }
}
