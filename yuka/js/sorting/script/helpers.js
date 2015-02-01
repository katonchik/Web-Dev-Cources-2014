define("helpers", [], function(){
    "use strict";

    return {
        generateRandomArray: function (array_length, diapason){
            var array = [];

            array_length = array_length || 25;
            diapason = diapason || 100;

            for (var i = 0; i < array_length; i++) {
                array.push(Math.floor(Math.random() * diapason));
            }

            return array;
        },

        swap: function (inputArray, firstElementIndex, secondElementIndex) {
            var temp = inputArray[firstElementIndex];

            inputArray[firstElementIndex] = inputArray[secondElementIndex];
            inputArray[secondElementIndex] = temp;

            return inputArray;
        }
    };
});