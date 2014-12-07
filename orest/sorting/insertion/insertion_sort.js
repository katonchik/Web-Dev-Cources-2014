//Insertion sorting

function sortArray(inArr) {
    var outArr = inArr;
    var elem, // current selected element's value
    pos;  // position to be inserted

    for (var i = 1; i < outArr.length; i++) {
        pos = i;
        for (var x = i - 1; x >= 0; x--) {
            if (outArr[x] > outArr[i]) {
                pos = x;  //found the position to insert our elem
            }
        }

        // removing elem from it's current position to the new one
        if (pos!=i) {
            elem = outArr.splice(i, 1)[0];
            outArr.splice(pos, 0, elem);
        }
    }
    console.log("Your sorted output array is: " + outArr);
}