//TODO: make sort functions immutable. (Use array clone)

define(["sort/helpers", "sort/select_sort"],
    function (helper,selectSort) {
//        var randomArray=helper.generateRandomArray(20);
        var randomArray=[1,2,56,3,7,2,4,6,3];
        var sortedArray=selectSort(randomArray);
        console.log("Unsorted array: " + randomArray);
        console.log("Selectsorted array: " + sortedArray);
    })
