//Buble sorting

function bubble_sort(numbers) {

    var swaped;
    do {
        swaped = false;
        for (var i = 1; i < numbers.length; i++)
            if (numbers[i - 1] > numbers[i]) {
                swap(numbers, i - 1, i);
                swaped = true;
            }
    } while (swaped);
    return numbers;
}
var array=generatorRandomNumber(10);

console.log("Buble sorting inn", array);

console.log("Buble sorting out",bubble_sort(array) );