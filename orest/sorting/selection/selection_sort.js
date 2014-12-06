//Selection sorting

var arr = window.prompt('Введіть будь-яку кількість чисел через пробіл').split(' ').map(Number);

function sort(someArr) {
    var min,
        minNew;



    // arr [2, 3, 4, 1]
    for (var i = 0; i < someArr.length - 1; i++) {
        min = i;
        for (var x = i + 1; x < someArr.length; x++) {
            if (someArr[x] < someArr[min]) {
                min = x;
            }
        }
        if (min!=i) {
            minNew = someArr[min];
            someArr[min] = someArr[i];
            someArr[i] = minNew;
        }
    }
    console.log(someArr);
}

sort(arr);