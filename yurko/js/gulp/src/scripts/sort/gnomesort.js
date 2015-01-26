// Gnome sort function
function gnomesort(unsortedArray) {
    var orderedArray=unsortedArray;
    var i=0;
//    console.log(orderedArray);
    while(i<orderedArray.length) {
        if ((orderedArray[i - 1] <= orderedArray[i]) || (i < 1)) {
            i++;
        }
        else {
            //TODO: write swap function
            var tmp = orderedArray[i];
            orderedArray[i] = orderedArray[i - 1];
            orderedArray[i - 1] = tmp;
            i--;
        }
//        console.log(orderedArray);
    }
    return orderedArray;
}
