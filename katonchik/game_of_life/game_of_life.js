/**
 * Created by katonchik on 07.12.2014.
 */


function GameOfLife() {
    var canvasSide = 70, //number of cells per canvas side
        cellSide = 7, //cell size in pixels
        year = 0, //duration of one cycle in milliseconds
        canvas,
        cellId,
        cell,
        cells = {},
        domCell,
        newClass,
        i,
        j;

    canvas = document.createElement('div');
    document.body.appendChild(canvas);
    canvas.className = "canvas";

    //Populate canvas
    for (i = 0; i < canvasSide; i++) {
        for (j = 0; j < canvasSide; j++) {
            cellId = makeCellId(i, j);
            cell = {
                x: i + 97, //ascii code
                y: j,
                isAlive: 0,
                id: cellId
            };
            cells[cellId] = cell;

            //Initial rendering
            domCell = document.createElement('div');
            domCell.className = "cell";
            if (cell.isAlive) newClass = "alive";
            else newClass = "dead";

            domCell.classList.add(newClass);
            cellId = makeCellId(i, j);
            cell = cells[cellId];
            domCell.id = cell.id;
            domCell.style.left = cellSide * i + 'px';
            domCell.style.top = cellSide * j + 'px';
            domCell.style.height = cellSide + 'px';
            domCell.style.width = cellSide + 'px';
            canvas.appendChild(domCell);
            //domCell.innerHTML = cellId;
        }
    }

//    addPattern("block", 1, 1);
//    addPattern("blinker", 5, 1);
//    addPattern("glider", 1, 5);
    addPattern("gun", 30, 30);
    renderCanvas();

    //Begin life
    setInterval(function(){update();}, year);


    function addPattern(patternName, offsetX, offsetY){
        var pattern;

        switch(patternName) {

            case "block":
                pattern = [
                    {x: 0, y: 0},
                    {x: 1, y: 0},
                    {x: 0, y: 1},
                    {x: 1, y: 1}
                ];
                break;

            case "glider":
                pattern = [
                    {x: 1, y: 0},
                    {x: 2, y: 1},
                    {x: 0, y: 2},
                    {x: 1, y: 2},
                    {x: 2, y: 2}
                ];
                break;
            case "blinker":
                pattern = [
                    {x: 0, y: 0},
                    {x: 1, y: 0},
                    {x: 2, y: 0}
                ];
                break;
            case "gun":
                pattern = [
                    {x: 0, y: 0},
                    {x: 1, y: 0},
                    {x: 2, y: 0},
                    {x: 4, y: 0},
                    {x: 0, y: 1},
                    {x: 3, y: 2},
                    {x: 4, y: 2},
                    {x: 1, y: 3},
                    {x: 2, y: 3},
                    {x: 4, y: 3},
                    {x: 0, y: 4},
                    {x: 2, y: 4},
                    {x: 4, y: 4}
                ];
                break;
            default:
                return;
        }

        for(i=0; i<pattern.length; i++) {
            cellId = makeCellId(pattern[i].x + offsetX, pattern[i].y + offsetY);
            cells[cellId].isAlive = 1;
        }
    }

    function renderCanvas()
    {
        for (i = 0; i < canvasSide; i++) {
            for (j = 0; j < canvasSide; j++) {
                cellId = makeCellId(i, j);
                cell = cells[cellId];
                domCell = document.getElementById(cellId);
                domCell.classList.remove("dead");
                domCell.classList.remove("alive");
                if (cell.isAlive) {
                    newClass = "alive";
                }
                else {
                    newClass = "dead";
                }
                domCell.classList.add(newClass);
            }
        }
    }

    function updateAllCells() {
        for (i = 0; i < canvasSide; i++) {
            for (j = 0; j < canvasSide; j++) {
                cellId = makeCellId(i, j);
                if(cells[cellId].newState !== undefined){
                    cells[cellId].isAlive = cells[cellId].newState; //otherwise keep old state
                }
                cells[cellId].newState = null;
            }
        }
    }


    function killCell(i, j)
    {
        var cid = makeCellId(i, j);
        cells[cid].newState = 0;
    }

    function reanimateCell(i, j)
    {
        var cid = makeCellId(i, j);
        cells[cid].newState = 1;
    }

    function retainCellState(i, j)
    {
        var cid = makeCellId(i, j);
        cells[cid].newState = cells[cid].isAlive;
    }

    function countLiveNeighbors(i, j) {
        var count = 0;
        count += isCellAlive(i - 1, j - 1);
        count += isCellAlive(i, j - 1);
        count += isCellAlive(i + 1, j - 1);

        count += isCellAlive(i - 1, j);
        count += isCellAlive(i + 1, j);

        count += isCellAlive(i - 1, j + 1);
        count += isCellAlive(i, j + 1);
        count += isCellAlive(i + 1, j + 1);

        return count;
    }

    function isCellAlive(i, j) {
        var neighborId = makeCellId(i,j);
        return cells[neighborId] !== undefined  //is within canvas boundaries
            && cells[neighborId].isAlive;
    }

    function makeCellId(i, j)
    {
        return String.fromCharCode(i + 97) + j;
    }

    function calculateNewStates()
    {
        for (i = 0; i < canvasSide; i++) {
            for (j = 0; j < canvasSide; j++) {
                cellId = makeCellId(i, j);
                var liveNeighborsCount = countLiveNeighbors(i, j);

                if (liveNeighborsCount < 2 || liveNeighborsCount > 3) {
                    killCell(i, j);
                }
                else if(liveNeighborsCount == 2) {
                    retainCellState(i, j);
                }
                else if (liveNeighborsCount == 3) {
                    reanimateCell(i, j);
                }
            }
        }
    }

    function update(){
        calculateNewStates();
        updateAllCells();
        renderCanvas();

    }
}

