/**
 * Created by ad on 11.11.14.
 */
var numbers = generatorRandomNumber(10);


//Quick sorting
console.log("quick sort inn", numbers);
function quick_sorting(numbers) {
    var count;
    var sortedElement = 0;
    var bool = true;
    var sortBool = true;

    do {
        bool = false;
        sortBool = true;
        count = sortedElement + 1;
        for (var i = sortedElement; i < numbers.length; i++) {
            if (numbers[sortedElement] > numbers[i]) {
                if (i !== sortedElement + 1) {
                    var el = numbers[i];
                    numbers[i] = numbers[count];
                    numbers[count] = el;
                }
                count++;
                sortBool = false;
                bool = true;
            }
        }

        if (sortBool) {
            sortedElement++;
        }
        if (bool) {
            el = numbers[sortedElement];
            for (var k = sortedElement; k < numbers.length; k++) {
                if (k === count - 1) {
                    numbers[k] = el;
                    break;
                }
                else {
                    numbers[k] = numbers[k + 1]
                }
            }

        }
    } while (sortedElement !== numbers.length + 1);
    return numbers;
}

console.log("quick sort out", quick_sorting(numbers));