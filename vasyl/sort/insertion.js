/**
 * Created by ad on 11.11.14.
 */



var numbers = generaterator_random_number(10);
//Insertion sorting
console.log("insertion sort out", numbers);
function inseretion(numbers) {
    for (var i = 1; i < numbers.length; i++) {
        var copyNumber = numbers[i];
        var j = i;
        while (j > 0 && copyNumber < numbers[j - 1]) {
            numbers[j] = numbers[j - 1];
            j--;
        }
        numbers[j] = copyNumber;
    }
return numbers;


}

console.log("insertion sort out", numbers);