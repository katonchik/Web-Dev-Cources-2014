//Bubble sorting

var swapped = false;

//Array sorting
function sortArray(inArr) {
    var outArr = inArr;
    function sort(outArr) {
        for (var i=0; i<outArr.length; i++) { 
          
            //define Left and Right numbers to compare  
            var left = outArr[i];
            var right = outArr[i+1];

            // compare and swap
            if (left > right) {
                outArr.splice(i, 2, right, left);
                swapped = true;
            } 
        }
        while (swapped) {
            swapped = false;
            sort(outArr);
        }
    }
    sort(outArr);
    console.log("Your sorted output array is: " + outArr);
}





