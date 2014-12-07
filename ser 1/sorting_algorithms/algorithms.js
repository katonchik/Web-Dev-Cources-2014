

// Selection Sort
function selectionSort(array){
	console.time('selectionSort');
	for (var i = 0; i < arr.length; i++){
		// set minimum to this position
		var min = i;
		// check the rest of the array to see if anything is smaller
		for (var j = i + 1; j < arr.length; j++){
			if (array[j] < array[min]){
				min = j;
			}
		}
		// if the minimum isn't in the position, swap it
		if (i != min){
			swap(array, i, min);
		}
	}
	console.log('Selection Sort: ' + array);
	console.timeEnd('selectionSort');
}
selectionSort(arr);

// Insertion Sort
function insertionSort (array){
	console.time('insertionSort');
	// for every value in the array
	for(var i = 0; i < arr.length; i++){
		// look back at the elements before it
		var current = array[i];
		var comparisonIndex = i;
		// as long as comparisonIndex value is less than previous value
		while(current < array[comparisonIndex - 1]){
			// move up previous value
			array[comparisonIndex] = array[comparisonIndex-1];
			comparisonIndex--;
		}
		// replace sorted value back into array
		array[comparisonIndex] = current;
	}
	console.log('Insertion Sort: ' + array);
	console.timeEnd('insertionSort');
}
insertionSort(arr);

// Merge Sort
function mergeSort(array){
	console.time('mergeSort');
	var middle = Math.floor(array.length / 2),
		left   = array.slice(0, middle),
		right  = array.slice(middle);

	function merge(left, right){
		var result  = [],
			il      = 0,
			ir      = 0;
		while (il < left.length && ir < right.length){
			if (left[il] < right[ir]){
				result.push(left[il++]);
			} else {
				result.push(right[ir++]);
			}
		}
		return result.concat(left.slice(il)).concat(right.slice(ir));
	}

	if (array.length < 2) {
		return array;
	}
	return merge(mergeSort(left), mergeSort(right));
}
console.log('Merge Sort: ' + mergeSort(arr));
console.timeEnd('mergeSort');

// Quick Sort
function quickSort(array, customSort){
	console.time('quickSort');
  
	if(!customSort) {
		customSort = function(a, b) {
		  return a < b;
		};
	}
	if (array.length === 0) {
		return [];
	}
	var left = [];
	var right = [];
	var pivot = array[0];
  
	for (var i = 1; i < array.length; i++) {
		if (customSort(array[i], pivot)) {
			left.push(array[i]);
		} else {
			right.push(array[i]);
		}
	}
	return quickSort(left).concat(pivot, quickSort(right));
}
console.log('Quick Sort: ' + quickSort(arr));
console.timeEnd('quickSort');