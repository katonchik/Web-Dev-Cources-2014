// Random array generating
function generatearray(){
    var randomlyGeneratedArray= [];

    for(var i=0;i<arraysize;i++){
        randomlyGeneratedArray[i] = Math.floor(Math.random()*arraysize);
    }
    return randomlyGeneratedArray;
}