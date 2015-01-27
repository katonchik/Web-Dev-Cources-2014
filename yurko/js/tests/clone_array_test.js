var randomArraySize=20;
var sortedArray=[];
var randomArray=[];

// Random array generating
function generateRandomArray(arraySize){
    var rArray=[];

    for(var i=0;i<arraySize;i++){
        rArray[i]=Math.floor(Math.random()*arraySize);
    }
    return rArray;
}

function cloneArray(arrayToClone){
    var clonedArray=arrayToClone.slice(0);
    return clonedArray;
}

Array.prototype.clone = function() {
    return this.slice(0);
};


randomArray = generateRandomArray(randomArraySize);
//sortedArray = cloneArray(randomArray);

sortedArray = randomArray.clone();
console.log(randomArray);
console.log(sortedArray);
