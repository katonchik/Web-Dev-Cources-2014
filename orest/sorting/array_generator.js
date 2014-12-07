window.onload = function() {
    var inArr = [];

    // Generate an array or ask a user to provide one.
    function createNewArray() {
        var answer = confirm('Do you want to create a random array?');
        if (answer == true) {
            for (var y = 0, n = 100; y < 40; y++) {
                inArr.push(Math.round(Math.random() * n))
            }
        } 
        else {
            inArr = window.prompt('Type numbers space separated');
            if (inArr !== null) {
                inArr = inArr.split(' ');
            }
            else {
                alert('Did you enter those god damn\' numbers? Try again!');
                createNewArray();
            }
        }   

        console.log("Your input array is: ");
        console.log(inArr);

        console.log("Click 'Sort It!' on display or type 'sortArray(inArr)' to sort it!");
    }
    createNewArray();
    addButtonEvents(inArr);

}