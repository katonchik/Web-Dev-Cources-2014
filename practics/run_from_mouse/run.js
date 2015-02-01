function Runner (runnerElement) {
    "use strict";
    const RUN_DISTANCE = 10;
    var runner, mouse, distance, isRunned=false;

    function run (dx, dy, time) {
        runnerElement.style.margin = 0;
        runnerElement.style.left = runner.x + "px";
        runnerElement.style.top = runner.y + "px";

        isRunned = true;

        var start = null;
        function step (timestamp){
            start = start || timestamp;

            var progress = timestamp - start;
            var progresPart = progress/time;

            if (progress < time) {
                runnerElement.style.top = runner.y + dy * progresPart + "px";
                runnerElement.style.left = runner.x + dx * progresPart + "px";
                window.requestAnimationFrame(step);
            } else {
                isRunned = false;
            }
        }

        window.requestAnimationFrame(step);
    }

    function mouseHandler (ev) {
        if (!isRunned) {
            runner = { x : runnerElement.offsetLeft , y: runnerElement.offsetTop };
            mouse =  { x : ev.clientX, y : ev.clientY };
            distance = {
                x : runner.x - mouse.x,
                y : runner.y - mouse.y
            };
            distance.length  = Math.sqrt( Math.abs(distance.x)+ Math.abs(distance.y));

            
            if ((distance.length < RUN_DISTANCE)) {
                console.log(distance.x, distance.y);
                run(distance.x, distance.y, 1000);
            }
        }

    }

    function init () {
        document.addEventListener("mousemove", mouseHandler);
    }

    init();
}

new Runner(document.getElementById("runner"));

