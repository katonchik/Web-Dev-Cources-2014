/**
 * Sorts input array using insertion algorithm.
 * @param array {Array}
 * @returns {Array}
 */
function insertionSort (array){
    var newArray = array.slice();   // copy of new array
	console.time('insertionSort');	// start timer
	// for every value in the array
	for(var i = 0; i < arr.length; i++){
		// look back at the elements before it
		var current = newArray[i];
		var comparisonIndex = i;
		// as long as comparisonIndex value is less than previous value
		while(current < newArray[comparisonIndex - 1]){
			// move up previous value
			newArray[comparisonIndex] = newArray[comparisonIndex-1];
			comparisonIndex--;
		}
		// replace sorted value back into array
		newArray[comparisonIndex] = current;
	}
	console.timeEnd('insertionSort');	// end timer
	console.log('Insertion Sort: ' + newArray);
}

