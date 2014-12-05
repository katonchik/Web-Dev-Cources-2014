/**
 * Generate random array
 * @param length {Number} length of result array
 * @returns {Array}
 */
function generateRandomArr (length) {
	length = parseInt(length) || 40;

	var randomArr = [];

	for (var i = 0; i < length; i++) {
		randomArr.push(Math.round(Math.random() * length))
	}
	return randomArr

}


// Random array of numbers
var items = generateRandomArr(4000);
console.log("Generated");
var len = items.length;


/**
 *
 * @param items
 * @param firstIndex
 * @param secondIndex
 */
function swap(items, firstIndex, secondIndex){
	var temp = items[firstIndex];
	items[firstIndex] = items[secondIndex];
	items[secondIndex] = temp;
}

/**
 * Bubble Sort
 * @param array {Array}
 */
function bubbleSort(array){
	console.time('bubbleSort');
	var continueSorting = true;

	while(continueSorting){
		continueSorting = false;

		for(var i = 0; i < len; i++){
			if(array[i] > array[i+1]){
				var temp = array[i];
				array[i] = array[i+1];
				array[i+1] = temp;
				continueSorting = true;
			}
		}
	}

	console.log('Bubble Sort: ' + array);
	console.timeEnd('bubbleSort');
}

bubbleSort(items);

// Selection Sort
function selectionSort(array){
	console.time('selectionSort');
	for (var i = 0; i < len; i++){
		// set minimum to this position
		var min = i;
		// check the rest of the array to see if anything is smaller
		for (var j = i + 1; j < len; j++){
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
selectionSort(items);

// Insertion Sort
function insertionSort (array){
	console.time('insertionSort');
	// for every value in the array
	for(var i = 0; i < len; i++){
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
insertionSort(items);

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
console.log('Merge Sort: ' + mergeSort(items));
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
console.log('Quick Sort: ' + quickSort(items));
console.timeEnd('quickSort');