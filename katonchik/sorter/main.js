/**
function sort(unsorted)
{
    var one_bubble = new Bubble();
    var sorted = one_bubble.sort(unsorted)

    document.getElementById('output').innerHTML=sorted;
}
*/

function generateRandomArray(arrayLength) {
    var generatedArray = [];
    for(var i=0; i<arrayLength; i++) {
        generatedArray[i] = Math.floor((Math.random() * 100) + 1);
    }
    document.getElementById("unsorted_array").value = generatedArray.join(",");
}


function doSort() {
    var unsortedStr = document.getElementById("unsorted_array").value,
        aSorter,
        algorithmName,
        algorithm = document.getElementById("algorithm").value;
    switch (algorithm) {
        case "Bubble":
            aSorter = new BubbleSorter();
            break;
        case "Selection":
            aSorter = new SelectionSorter();
            break;
    }
    algorithmName = aSorter.algorithmName;
    var sortedArrayStr = aSorter.sort(unsortedStr, algorithm);
    console.log('sorting with ' + algorithmName + ' method');
    document.getElementById('output').innerHTML="Sorted by the '" + algorithmName + "' method: " + sortedArrayStr;

}
