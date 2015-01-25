/**
 * Created by ad on 20.01.2015.
 */
var div = document.body.getElementsByClassName("animation")[0];

div.addEventListener("mouseover", run);
function run() {
    var count = 0;
    var X = parseInt(div.style.left.slice(0, 3));



    function move() {
        count++;
        div.style.left = X + "px";
        X += 0.2;
        if (count == 50) clearInterval(id);
    }
    var id = setInterval(move, 10);
}
