//Bubble sorting
/**
 *
 * @param numbers Array
 * @returns {Array}
 */
Bubble = function (numbers) {
    //use to contain bubble DOM elements
    var container,
    divList;    //use to contain container classList

    /**
     *
     * @returns {HTMLElement}
     */
    this.init = function () {
        container = document.createElement("div");
        container.classList.add("start");
        numbers.forEach(function (el) {
            var d = document.createElement("div");
            d.classList.add("test");
            d.style.height = el + "px";
            d.innerHTML = el;
            container.appendChild(d);
        })
        document.body.appendChild(container);

    }
    this.sort = function () {
        this.init();
        //ms-time between each step of animation in millisecond
        //length - number of elements which will be animated
        var swapped, length = numbers.length, ms = 500;
        container = document.body.getElementsByClassName('start')[0];
        divList = container.getElementsByTagName('div');
        var toggle,canSwap;
        //set pause before each start of insteadForLoop function
        //pause time is equal to insteadForLoop full loop
        function setPause() {
            //main algorithm (bubble sorting)
            do {
                swapped = false;
                var i = 1;//insteadForLoop counter
                //using instead for loop

                function insteadForLoop() {

                    var a = divList[i - 1]
                    var b = divList[i]
                    //toggle class for elements which will be swapped
                    a.classList.toggle("current");
                    b.classList.toggle("current");
                    if (numbers[i - 1] > numbers[i]) {
                        //swap dom elements
                        domSwap(container, divList, i - 1, i);
                        swap(numbers, i - 1, i);
                        swapped = true;
                    }
                    if(i==1)
                    //toggle class for swapped elements
                    //ms/2 time
                    toggle=setTimeout(function () {
                        a.classList.toggle("current");
                        b.classList.toggle("current");
                    }, ms / 2)
                    i++;

                    //loop condition
                    if (i == numbers.length) {
                        clearInterval(forLoopTimer)

                    }
                }
                var forLoopTimer = setInterval(insteadForLoop, ms);

            } while (swapped);
            if (swapped) {
                clearTimeout(toggle);
                clearInterval(pause);
                return numbers;
            }
        }

        //length*ms= time for one full "for" loop
        var pause = setInterval(setPause, length * ms)

    }
}

var array = generatorRandomNumber(4);
console.log("Buble sorting inn", array);
var d = new Bubble(array);
var n = d.sort();
console.log("Buble sorting out", n);




