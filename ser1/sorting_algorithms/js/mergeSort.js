/**
 * Sorts input array using merge algorithm.
 * @param array {Array}
 * @return {Array}
 */
function mergeSort(array){
    var newArray = array.slice();   // copy of new array
	var result;
	function sort (array){
		if (array.length < 2) {
			return array;
		}
		var middle = Math.floor(array.length / 2),
			left   = array.slice(0, middle),
			right  = array.slice(middle);

		return merge(sort(left), sort(right));
	}	
    /**
     * Merges Two Arrays
     * @param left {Array}
     * @param right {Array}
     * @returns {Array}
     */
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
		result = result.concat(left.slice(il)).concat(right.slice(ir))
		return result;
	}
	console.time('mergeSort');
	result = sort(newArray);
	console.timeEnd('mergeSort');
	console.log('Merge Sort: ' + result);
}






 

  	