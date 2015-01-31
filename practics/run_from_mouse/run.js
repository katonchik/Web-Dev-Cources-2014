function run (distance, angle) {
    console.log("RUN!!", distance, angle);

}

document.addEventListener("mousemove", function (ev){
    var RUN_DISTANCE = 10;

    var directionElement = document.getElementById("direction"),
        widthElement = document.getElementById("width"),
        runnerElement = document.getElementById("runner"),

        runner = { x : runnerElement.cx.baseVal.value, y: runnerElement.cy.baseVal.value},
        mouse =  { x  :ev.clientX, y : ev.clientY },
        distance  = Math.sqrt(Math.abs(runner.x - mouse.x) + Math.abs(runner.y - mouse.y)),

        runDistance;

    directionElement.setAttribute("x1", mouse.x);
    directionElement.setAttribute("y1", mouse.y);

    widthElement.innerHTML = distance;

    if (distance < RUN_DISTANCE) {
        runDistance = RUN_DISTANCE - distance;
        run(runDistance, 0);
    }

});