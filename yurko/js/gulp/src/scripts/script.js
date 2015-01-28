//TODO: make sort functions immutable. (Use array clone)
var ARRAY_SIZE=20;


define(["sort/helpers", "sort/select_sort", "sort/bubblesort", "sort/quicksort",
        "sort/insertsort", "sort/mergesort", "sort/gnomesort"],
    function (helper,selectSort, bubblesort, quicksort, insertsort, mergesort,
              gnomesort) {
        var randomArray=helper.generateRandomArray(ARRAY_SIZE);
        console.log("Unsorted array: " + randomArray);

        console.log("BubbleSorted array: " + bubblesort(randomArray));

        console.log("Selectsorted array: " + selectSort(randomArray));

        console.log("QuickSorted array: " + quicksort(randomArray));

        console.log("InsertSorted array: " + insertsort(randomArray));

        console.log("MergeSorted array: " + mergesort(randomArray));

        console.log("GnomeSorted array: " + gnomesort(randomArray));
    }
)
