/**
 * Sorts input array using quick algorithm.
 * @param arr {Array}
 * @returns {Array}
 */
function quickSort(array, customSort){
    var newArray = arr.slice(),  // create copy of input array
    	result;
	console.time('quickSort');	// start timer
	function sort(array){
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
		return sort(left).concat(pivot, sort(right));
	}
	result = sort(newArray);
	console.timeEnd('quickSort'); // end timer
	console.log('Quick Sort: ' + result);
}
