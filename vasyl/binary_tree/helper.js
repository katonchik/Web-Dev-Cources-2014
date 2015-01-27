/**
 *generate random set of number
 * @param sizeOfArray
 * @returns {Array}
 */
function generatorRandomSet(sizeOfArray) {

    sizeOfArray = sizeOfArray*10 || 100;
    function generatorRandomNumber(number_of_elements) {

        var array = [];
        var number;
        for (var i = 0; i < number_of_elements; i++) {
            number = Math.round(Math.random() * 100);
            // if(array.)
            array.push(number);
        }
        return array;
    }

    var arr = generatorRandomNumber(sizeOfArray);
    return makeSet(arr).splice(0,sizeOfArray/10);

}
function makeSet(array){
    return array.filter(function (e, i, arr) {
        return arr.lastIndexOf(e) === i;
    });

}
/**
 * if array contain value return true
 * @param array
 * @param number
 * @returns {boolean}
 */
function numInArray (array,number){
   for(var i=0;i<array.length;i++){
        if(array[i]==number){
            return true;}
    }

    return false;
}