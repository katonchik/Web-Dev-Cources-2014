define(["sort/bubble", "data"] ,
function (sortBubble, data){
    console.log("Input array: " + data);
    console.log("Bubble sorted array: " + sortBubble(data));
});