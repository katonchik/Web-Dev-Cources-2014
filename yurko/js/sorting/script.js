/**
 * Created by Yurko on 24.01.15.
 */

/**
 * Created by Yurko on 24.01.15.
 */
/**
 * Created by Yurko on 16.01.15.
 */
var arraysize=20;

var sortedArray=new Array();
var randomArray=generatearray();

console.log("Random array: " + randomArray);

sortedArray=bubblesort(randomArray);
console.log("BubbleSorted array: " + sortedArray);

sortedArray=selectsort(randomArray);
console.log("SelectSorted array: " + sortedArray);

sortedArray=quicksort(randomArray);
console.log("QuickSorted array: " + sortedArray);

sortedArray=insertsort(randomArray);
console.log("InsertSorted array: " + sortedArray);


sortedArray=mergesort(randomArray);
console.log("MergeSorted array: " + sortedArray);

sortedArray=gnomesort(randomArray);
console.log("GnomeSorted array: " + sortedArray);


// Random array generating
function generatearray(){
    var rArray=new Array();

    for(var i=0;i<arraysize;i++){
        rArray[i]=Math.floor(Math.random()*arraysize);
    }
    return rArray;
}

// Bubblesorting
function bubblesort(x){
    var newArray=x;
    for(var i=0; i<newArray.length-1;i++)
        for (var j=0; j<newArray.length-i-1;j++){
            if (newArray[j]>newArray[j+1]){
                var tmp=newArray[j];
                newArray[j]=newArray[j+1];
                newArray[j+1]=tmp;
            }
        }
    return newArray;
}

// Selection sort
function selectsort(x){
    var newArray=x;

    for(var i=0; i<newArray.length-1;i++) {
        var min = i;
        for (var j = i + 1; j < newArray.length; j++) {
            if (newArray[min] > newArray[j]) {
                min = j;
            }
        }
// Можна перевірку не робити, а просто міняти?
        if (min != i) {
            var tmp = newArray[i];
            newArray[i] = newArray[min];
            newArray[min] = tmp;
        }
    }
    return newArray;
}
// Quick sort function
function quicksort(x) {
    var newArray=x;
    var left = new Array();
    var right = new Array();
    var pivot = newArray[0];
    if (newArray.length == 0) return [];
    for (var i = 1; i < newArray.length; i++){
        if (newArray[i] < pivot) left[left.length] = newArray[i];
        else right[right.length] = newArray[i];
    }
    return quicksort(left).concat(pivot,quicksort(right));
}


// Insert sort function
function insertsort(x) {
    var newArray=x;

    for(var i=0; i<newArray.length-1;i++) {
        var tmp=newArray[i];

        for (var j=i-1; j>=0&&newArray[j]>tmp;j--){
            newArray[j+1]=newArray[j];
        }

        newArray[j+1]=tmp;
    }
    return newArray;
}

// Merge sort function
function mergesort(x) {

    var newArray = x;
    var middleArray = parseInt(newArray.length/2);
    var right = new Array();
    var left = new Array();
    var mergedArray = new Array();

    if (newArray.length<2){
        return newArray;
    }
    else{
        left=newArray.slice(0,middleArray);
        right=newArray.slice(middleArray);

        left=mergesort(left);
        right=mergesort(right);

        mergedArray=merge(left,right);
//        console.log(mergedArray);
    }


    return mergedArray;
}

// function merge for mergesort algorythm;
/* input - two arrays:left and right
 return - array: sorted & joined left and right arrays

 заплутано виходить, бо насправді сортування в мерджі і навпаки.
 */
function merge(left,right){

    var result= new Array();
    var i=0;
    var j=0;
    while (i < left.length && j< right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        }
        else{
            result.push(right[j]);
            j++;
        }
    }
//    console.log(result.concat(left,right));
    return result.concat(left.slice(i),right.slice(j));
}

// Gnome sort function
function gnomesort(x) {
    var newArray=x;
    var i=0;
//    console.log(newArray);
    while(i<newArray.length) {
        if ((newArray[i - 1] <= newArray[i]) || (i < 1)) {
            i++;
        }
        else {
            var tmp = newArray[i];
            newArray[i] = newArray[i - 1];
            newArray[i - 1] = tmp;
            i--;
        }
//        console.log(newArray);
    }
    return newArray;
}
