/**
 * Generate random array
 * @param length {Number} length of result array
 * @returns {Array}
 */
function generateRandomArr (length) {
	length = parseInt(length) || 20;
	var randomArr = [];
	for (var i = 0; i < length; i++) {
		randomArr.push(Math.round(Math.random() * length))
	}
	return randomArr;
}
/**
 * Swap 2 elements in array
 * @param arr {Array}
 * @param firstIndex {Number}
 * @param secondIndex {Number}
 */
function swap(arr, firstIndex, secondIndex){
	var temp = arr[firstIndex];
	arr[firstIndex] = arr[secondIndex];
	arr[secondIndex] = temp;
	return arr;
}