//Insertion sorting

//var arr = window.prompt('Введіть будь-яку кількість чисел через пробіл').split(' ').map(Number);

var arr = [5, 1, 4, 2, 3]

function sort(someArr) {

    var elem, // current selected element's value
    pos;  // position to be inserted

    for (var i = 1; i < someArr.length; i++) {
        for (var x = i - 1; x >= 0; x--) {
            if (someArr[x] > someArr[i]) {
                pos = x;
            }
        }
        if (pos!=i) {
            elem = someArr.splice(i, 1)[0];
            someArr.splice(pos, 0, elem);
        }
    }
    console.log(someArr);
}

sort(arr);