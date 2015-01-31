function Runner (runnerElement) {
    "use strict";
    const RUN_DISTANCE = 10;
    var runner, mouse, distance, isRunned=false;

    function run (dx, dy, time) {
        isRunned = true;
        var start = null;
        function step (timestamp){
            start = start || timestamp;

            var progress = timestamp - start;
            var progresPart = progress/time;

            if (progress < time) {
                runnerElement.setAttribute("cx", runner.x + dx * progresPart);
                runnerElement.setAttribute("cy", runner.y + dy * progresPart);

                window.requestAnimationFrame(step);
            } else {
                isRunned = false;
            }
        }

        window.requestAnimationFrame(step);

    }

    function mouseHandler (ev) {
        runner = { x : runnerElement.cx.baseVal.value, y: runnerElement.cy.baseVal.value};
        mouse =  { x : ev.clientX, y : ev.clientY };
        distance = {
            x : runner.x - mouse.x,
            y : runner.y - mouse.y
        };
        distance.length  = Math.sqrt( Math.abs(distance.x)+ Math.abs(distance.y));

        if ((distance.length < RUN_DISTANCE) && !isRunned) {
            run(distance.x, distance.y, 1000);
        }
    }

    function init () {
        document.addEventListener("mousemove", mouseHandler);
    }

    init();
}

new Runner(document.getElementById("runner"));

