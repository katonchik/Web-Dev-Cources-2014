//Buble sorting
/**
 *
 * @param numbers Array
 * @returns {Array}
 */
Bubble = function (numbers) {

    this.init = function () {
        var div = document.createElement("div");
        container.className = "start";


        numbers.forEach(function (el) {
            var d = document.createElement("div");
            d.className = "test";

            d.style.height = el + "px";
            d.innerHTML = el;
            container.appendChild(d);
        })

        return container;
    }
    this.sort = function () {
        document.body.appendChild(this.init());
        var swaped, length = numbers.length, ms = 500;
        this.container = document.body.getElementsByClassName('start')[0];
        this.divList = this.container.getElementsByTagName('div');
        function Sort() {
            do {
                swaped = false;
                var i = 1;
                function sort() {
                    var a = this.divList[i - 1]
                    var b = this.divList[i]
                    a.className = "current";
                    b.className = "current"
                    if (numbers[i - 1] > numbers[i]) {
                        domSwap(this.container, this.divList, i - 1, i);
                        swap(numbers, i - 1, i);
                        swaped = true;
                    }
                    setTimeout(function () {
                        a.className = "test";
                        b.className = "test";
                    }, ms / 2)

                    i++;
                    if (i == numbers.length) {
                        clearInterval(t)
                    }
                }
                var t = setInterval(sort, ms);

            } while (swaped);

            if (swaped) {
                clearInterval(timer);
                return numbers;
            }
        }

        var timer = setInterval(Sort, length * ms)
    }
}

var array = generaterator_random_number(10);
console.log("Buble sorting inn", array);
var d = new Bubble(array);
var n = d.sort();
console.log("Buble sorting out", n);
var div = d.container;
var divList = d.divList;



