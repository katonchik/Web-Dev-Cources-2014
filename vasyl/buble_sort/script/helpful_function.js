var array = [];

function generaterator_random_number(n) {
    n = n || 10;

    for (var i = 0; i < n; i++) {
        array.push(Math.round(Math.random() * 100));
    }
    return array;
}

//Swap function
function swap(ar, a, b) {
    var el = ar[a];
    ar[a] = ar[b];
    ar[b] = el;
}

domSwap=function(container,list,firsElementIndex,secondElementIndex){

    var a= list[firsElementIndex];
    var b= list[secondElementIndex];
    container.insertBefore(b,list[firsElementIndex]);
};
