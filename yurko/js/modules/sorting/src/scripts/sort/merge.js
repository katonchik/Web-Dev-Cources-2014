// function merge for mergesort algorythm;
/* input - two arrays:left and right
 return - array: sorted & joined left and right arrays

 заплутано виходить, бо насправді сортування в мерджі і навпаки.
 */
function merge(left,right){

    var resultArray = [];
    var i=0;
    var j=0;
    while (i < left.length && j< right.length) {
        if (left[i] < right[j]) {
            resultArray.push(left[i]);
            i++;
        }
        else{
            resultArray.push(right[j]);
            j++;
        }
    }
//    console.log(resultArray.concat(left,right));
    return resultArray.concat(left.slice(i),right.slice(j));
}
