/**
 * Created by ad on 11.11.14.
 */
var numbers = generaterator_random_number(30);

console.log("Randomized quick sort inn", numbers);

//Randomized quick sorting

RandomizeQuick = function (array) {

    this.render=function(){
        var div = document.createElement("div");



        numbers.forEach(function(el){
            // t+=' '+'<container class="test"'+' index.scss.css="height: "'+el+'"px" >'+el+'</container>';
            var d =document.createElement("div");
            d.className="test";

            d.style.height=el+"px";
            d.innerHTML=el;
            container.appendChild(d);
        })
        //console.log(t);
        //d.innerHTML=t;
        return container;
    }
    this.sort = function () {
        if (array.length < 2) {
            return array;
        }

        var pivotIndex = Math.floor(Math.random() * array.length);
        var pivot = array[pivotIndex];
        var left = [];
        var right = [];
        for (i = 0; i < array.length; i++) {
            if (i === pivotIndex) {
                continue;
            }
            if (array[i] >= pivot) {
                right.push(array[i]);
            } else {
                left.push(array[i]);
            }
        }
        return setTimeout(function(){ this.sort(left).concat(pivot, this.sort(right))  }, 2000);
    }
};

console.log("Randomized quick sort out", sortQuickRandom(numbers));