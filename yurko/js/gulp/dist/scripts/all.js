var require = {
    baseUrl: "scripts",
    paths: {
        sort: "sort"
    }
}

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

define(["sort/helpers"], function (helper) {
// Bubblesorting
    function bubblesort(unsortedArray) {
        var orderedArray;
        var i, j;

        orderedArray = unsortedArray.clone();
//      Another way to clone array
//      orderedArray = helper.copyArray(unsortedArray);

        for (i = 0; i < orderedArray.length - 1; i++) {

            for (j = 0; j < orderedArray.length - i - 1; j++) {

                if (orderedArray[j] > orderedArray[j + 1]) {
                    orderedArray = helper.swap(orderedArray, j, j+1);
                }
            }
        }
        return orderedArray;
    }
    return bubblesort;
})

define(["sort/helpers"], function (helper) {
    // Gnome sort function
    function gnomesort(unsortedArray) {
        var orderedArray;
        var i = 0;

//        Another way to clone array
//        orderedArray = unsortedArray.clone();

        orderedArray = helper.copyArray(unsortedArray);

        //    console.log(orderedArray);
        while (i < orderedArray.length) {
            if ((orderedArray[i - 1] <= orderedArray[i]) || (i < 1)) {
                i++;
            }
            else {
                //TODO: write swap function
                orderedArray=helper.swap(orderedArray, i, i-1);
                i--;
            }
        }
        return orderedArray;
    }
    return gnomesort;
})
define([], function () {
    // exchange array elements
    function swap(modifyingArray, firstIndex, secondIndex) {
        var tmp = modifyingArray[firstIndex];
        modifyingArray[firstIndex] = modifyingArray[secondIndex];
        modifyingArray[secondIndex] = tmp;
        return modifyingArray;
    }



// Random array generating
    function generateRandomArray(arraysize){
        var randomlyGeneratedArray= [];

        for(var i=0;i<arraysize;i++){
            randomlyGeneratedArray[i] = Math.floor(Math.random()*arraysize);
        }
        return randomlyGeneratedArray;
    }


    function copyArray(arrayToClone){
        var copiedArray=arrayToClone.slice(0);
        return copiedArray;
    }


    Array.prototype.clone = function() {
        return this.slice(0);
    };


    return {
            swap: swap,
            generateRandomArray: generateRandomArray,
            clone: Array.prototype.clone,
            copyArray: copyArray
    }

})
define([], function () {

    // Insert sort function
    function insertsort(unsortedArray) {
        var orderedArray;
        var buffer, i, j;

        orderedArray = unsortedArray.clone();
//      Another way to clone array
//      orderedArray = helper.copyArray(unsortedArray);

        for (i = 0; i < orderedArray.length; i++) {
            buffer = orderedArray[i];

            for (j = i - 1; j >= 0 && orderedArray[j] > buffer; j--) {
                orderedArray[j + 1] = orderedArray[j];
            }

            orderedArray[j + 1] = buffer;
        }
        return orderedArray;
    }
    return insertsort;
})
define([], function () {

    /* function merge for mergesort algorythm;
     input - two arrays:left and right
     return - array: sorted & joined left and right arrays
     */
    function merge(left, right) {

        var resultArray = [];
        var i = 0;
        var j = 0;
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                resultArray.push(left[i]);
                i++;
            }
            else {
                resultArray.push(right[j]);
                j++;
            }
        }
        //    console.log(resultArray.concat(left,right));
        return resultArray.concat(left.slice(i), right.slice(j));
    }
    return merge;
})
define(["sort/merge", "sort/helpers"],
function (merge, helper) {

    // Merge sort function
    function mergesort(unsortedArray) {

        var orderedArray;

        var middleOfArray;
        var right = [];
        var left = [];
        var mergedArray = [];


//      Another way to clone array
        orderedArray = helper.copyArray(unsortedArray);
//        orderedArray = unsortedArray.clone();

        middleOfArray = parseInt(orderedArray.length / 2);
        if (orderedArray.length < 2) {
            return orderedArray;
        }
        else {
            left = orderedArray.slice(0, middleOfArray);
            right = orderedArray.slice(middleOfArray);

            left = mergesort(left);
            right = mergesort(right);

            mergedArray = merge(left, right);
        }


        return mergedArray;
    }
    return mergesort;
})
define(["sort/helpers"], function (helper) {

    // Quick sort function
    function quicksort(unsortedArray) {
        var orderedArray = unsortedArray;
        var leftArrayPart = [];
        var rightArrayPart = [];
        var pivot = orderedArray[0];

//      Another way to clone array
        orderedArray = helper.copyArray(unsortedArray);
//      orderedArray = unsortedArray.clone();

        if (orderedArray.length === 0) {
            return [];
        }

        for (var i = 1; i < orderedArray.length; i++) {
            if (orderedArray[i] < pivot) {
                leftArrayPart[leftArrayPart.length] = orderedArray[i];
            } else {
                rightArrayPart[rightArrayPart.length] = orderedArray[i];
            }
        }
        return quicksort(leftArrayPart).concat(pivot, quicksort(rightArrayPart));
    }
    return quicksort;
})


define(["sort/helpers"], function (helper) {
        // Selection sort function
        function selectSort(unsortedArray){
            var orderedArray;
            var i,
                j,
                minArrayElement;
//      Another way to clone array
//            orderedArray = helper.copyArray(unsortedArray);
            orderedArray = unsortedArray.clone();

            for (i = 0; i < orderedArray.length - 1; i++) {
                minArrayElement = i;
                for (j = i + 1; j < orderedArray.length; j++) {
                    if (orderedArray[minArrayElement] > orderedArray[j]) {
                        minArrayElement = j;
                    }
                }

                if (minArrayElement != i) {
                    orderedArray = helper.swap(orderedArray, i , minArrayElement);
                }
            }
            return orderedArray;
        }
    return selectSort;
    })