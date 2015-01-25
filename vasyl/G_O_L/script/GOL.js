define ([], function (){
    'use strict';
    var GOL = function (sizeOfUniverse){
        "use strict";
        var cells = [],
            container;

        this.init = function () {
            container = document.createElement("div");
            container.className = "gol_container";
            init_1();
            function init_1() {
                for (var i = 0; i < sizeOfUniverse; i++) {
                    cells[i] = [];
                    container.appendChild(row_init());
                    for (var j = 0; j < sizeOfUniverse; j++) {
                        cells[i][j] = 0;
                        container.children[i].appendChild(cell_init());
                    }
                }
            }
            function row_init() {
                var row = document.createElement("div");
                row.classList.add("cell-container");
                return row;
            }
            function cell_init() {
                var cell = document.createElement("div");
                cell.classList.add("cell");
                return cell;
            }
            document.body.appendChild( container);
        };

        this.set_start_option=function(arr){
            arr.forEach(function(point) {
                cells[point[0]][point[1]] = 1;
            });
            draw();
        };

        function update(){
            var result = [];

            /**
             * Return amount of alive neighbours for a cell
             */
            function _countNeighbours(x, y) {
                var amount = 0;

                function _isFilled(x, y) {

                    return  cells[x] &&  cells[x][y];
                }

                if (_isFilled(x-1, y-1)) amount++;
                if (_isFilled(x,   y-1)) amount++;
                if (_isFilled(x+1, y-1)) amount++;
                if (_isFilled(x-1, y  )) amount++;
                if (_isFilled(x+1, y  )) amount++;
                if (_isFilled(x-1, y+1)) amount++;
                if (_isFilled(x,   y+1)) amount++;
                if (_isFilled(x+1, y+1)) amount++;

                return amount;
            }

            cells.forEach(function(row, x) {
                result[x] = [];
                row.forEach(function(cell, y) {
                    var alive = 0,
                        count = _countNeighbours(x, y);

                    if (cell > 0) { //Check if cell is live;
                        alive = count === 2 || count === 3 ? 1 : 0;
                    } else {
                        alive = count === 3 ? 1 : 0;
                    }

                    result[x][y] = alive;
                });
            });
            cells = result;
            draw();
        }

        function getCellNode(x,y){
            return container.children[x].children[y];
        }

        function draw(){
            cells.forEach(function(row,x){
                row.forEach(function(cell,y){
                    if (cell) {
                        getCellNode(x, y).classList.add("-alive");
                    } else {
                        getCellNode(x, y).classList.remove("-alive");
                    }
                });
            });
            setTimeout(function() {update();}, 70);
        }
    };
    return GOL;
});