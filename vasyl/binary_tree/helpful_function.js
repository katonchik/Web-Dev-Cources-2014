/**
 *
 * @param n
 * @returns {Array}
 */
function genrator_random_set(n) {

    n = n*10 || 100;
    function generaterator_random_number(n) {

        var array = [];
        var number;
        for (var i = 0; i < n; i++) {
            number = Math.round(Math.random() * 100);
            // if(array.)
            array.push(number);
        }
        return array;
    }

    var arr = generaterator_random_number(n);
    return make_set(arr).splice(0,n/10);

}
function make_set(arr){
    return arr.filter(function (e, i, arr) {
        return arr.lastIndexOf(e) === i;
    });

}
/**
 *
 * @param array
 * @param number
 * @returns {boolean}
 */

function is_num_in_array (array,number){

    for(var i=0;i<array.length;i++){
        if(array[i]==number){
            return true;}
    }


    return false;
}