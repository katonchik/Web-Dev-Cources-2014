define([], function () {
    // exchange array elements
    function swap(modifyingArray, firstIndex, secondIndex) {
        var tmp = modifyingArray[firstIndex];
        modifyingArray[firstIndex] = modifyingArray[secondIndex];
        modifyingArray[secondIndex] = tmp;
        return modifyingArray;
    }



// Random array generating
    function generateRandomArray(arraysize){
        var randomlyGeneratedArray= [];

        for(var i=0;i<arraysize;i++){
            randomlyGeneratedArray[i] = Math.floor(Math.random()*arraysize);
        }
        return randomlyGeneratedArray;
    }

    return {
            swap: swap,
            generateRandomArray: generateRandomArray
    }

})