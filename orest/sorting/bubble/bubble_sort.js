//Bubble sorting

var inArr = [];
var swapped = false;

// Generate an array or ask a user to provide one.
(function() {
    var answer = confirm('Do you want a random array?');
    if (answer == true) {
        for (var y = 0, n = 100; y < 40; y++) {
            inArr.push(Math.round(Math.random() * n))
        }
    } 
    else {
         inArr = window.prompt('Type numbers space separated').split(' ').map(Number);
    }   
    console.log("Your input array is: ");
    console.log(inArr);
    console.log("Type 'sort(inArr)' to sort it!");


}) ();



//Array sorting
function sortArray() {
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
    console.log("Your sorted output array is: " + outArr);

}




