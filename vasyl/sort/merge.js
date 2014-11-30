/**
 * Created by ad on 11.11.14.
 */
var numbers = generaterator_random_number(10);


console.log("merge sort inn", numbers);
//Merge sorting
function merge(numbers) {
    var step = 2;
    var count = 0;
    var b = [];
    var c = [];
    var d = [];
    do {
        for (var j = 0; j < numbers.length; j += step) {
            count = 0;
            var c_count = 0;
            var d_count = 0;

            for (var k = 0; k < step / 2; k++) {
                c[k] = numbers[k + j];
                if (j + k + step / 2 != numbers.length) {
                    d[k] = numbers[k + j + step / 2];
                } else {
                    d[k] = undefined;
                }

            }

            do {
                if (c[c_count] > d[d_count]) {
                    b[count] = d[d_count];
                    d_count++;
                }
                else {

                    b[count] = c[c_count];
                    c_count++;
                }
                count++;
                if (c_count >= step / 2) {
                    for (var i = d_count; i < d.length; i++) {
                        b[count] = d[i];
                        count++;
                    }
                    break;
                }
                if (d_count >= step / 2) {
                    for (var i = c_count; i < c.length; i++) {
                        b[count] = c[i];
                        count++;
                    }
                    break;
                }
            } while (count < step);
            if (step > numbers.length)step--;
            for (var i = 0; i < step; i++) {
                numbers[i + j] = b[i];
            }

        }
        step = step * 2;
    } while (step <= Math.round(numbers.length + 2));
    return numbers;
}
numbers=merge(numbers);
console.log("merge sort out", numbers);