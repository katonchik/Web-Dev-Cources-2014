//Countix sorting

var arr = [5, 1, 4, 2, 3, 5]


function sort(someArr) {

    var storage = [someArr[0]],
        pos;

    console.log(storage);

    for (var i = 1; i < someArr.length; i++) {
        var el = someArr[i];

        for (var x = 0; x < storage.length; x++) {
            if (el < storage[x]) {
                pos = x;
            }
        }
        storage.splice(pos, 0, el);
        console.log(storage);
    }
    console.log(storage);
    
}

sort(arr);
console.log("YES, It doesn't work yet :(")