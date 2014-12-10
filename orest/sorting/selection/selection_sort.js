//Selection sorting

function sortArray(inArr) {
    var min,
        minNew,
        outArr = inArr;

    for (var i = 0; i < outArr.length - 1; i++) {
        min = i;
        for (var x = i + 1; x < outArr.length; x++) {
            if (outArr[x] < outArr[min]) {
                min = x;
            }
        }
        if (min!=i) {
            minNew = outArr[min];
            outArr[min] = outArr[i];
            outArr[i] = minNew;
        }
    }
    console.log("Your sorted output array is: " + outArr);
}