/**
 * Sorts input array using selection algorithm.
 * @param array {Array}
 * @returns {Array}
 */
function selectionSort(array){
    var newArray = array.slice();   // copy of new array
	console.time('selectionSort');	// start timer
	for (var i = 0; i < arr.length; i++){
		var min = i;	// set minimum to this position
		// check the rest of the array to see if anything is smaller
		for (var j = i + 1; j < arr.length; j++){
			if (newArray[j] < newArray[min]){
				min = j;
			}
		}
		// if the minimum isn't in the position, swap it
		if (i != min){
			swap(newArray, i, min);
		}
	}
	console.timeEnd('selectionSort');	// end timer
	console.log('Selection Sort: ' + newArray);
    return newArray;
}
