/**
 * Created by ad on 21.01.2015.
 */
var number_of_elements = 64;
var a=[];

GOL = function (n_of_e){
    var cells = [],
    container;
    this.init = function () {

        container = document.createElement("div");
        container.className = "gol_container";
        init_1();
        function init_1() {
            for (var i = 0; i < n_of_e; i++) {
                cells[i] = [];
                container.appendChild(row_init());
                //console.log(container.children[i]);
                for (var j = 0; j < n_of_e; j++) {
                    cells[i][j] = 0;
                   // console.log( container[i]);
                    container.children[i].appendChild(cell_init());
                }
            }
        }
        function row_init() {
            var row = document.createElement("div");
            return row;
        }
        function cell_init() {
            var cell = document.createElement("div");
            cell.className = "cell";
           // cell.classList.add("-alive")
            return cell;
        }
        document.body.appendChild( container);
    }
    this.set_start_option=function(arr){
        arr.forEach(function(point) {
            //console.log(point[0],point[1],this.cells)
           // console.log( this.cells[point[0]][point[1]]);
            cells[point[0]][point[1]] = 1;
        });
        draw();
    }
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

                if (cell > 0) {
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
    function draw(){
        cells.forEach(function(row,x){
            row.forEach(function(cell,y){
                    if(cell){
                        container.children[x].children[y].classList.add("-alive");
                    }else{
                        container.children[x].children[y].classList.remove("-alive");
                    }
                });
        });
        setTimeout(function() {update();}, 70);
    }
}
var start_option= [
    [1, 5],[1, 6],[2, 5],[2, 6],[11, 5],[11, 6],[11, 7],[12, 4],[12, 8],[13, 3],[13, 9],[14, 3],[14, 9],[15, 6],
    [16, 4],[16, 8],[17, 5],[17, 6],[17, 7],[18, 6],[21, 3],[21, 4],[21, 5],[22, 3],[22, 4],[22, 5],[23, 2],
    [23, 6],[25, 1],[25, 2],[25, 6],[25, 7],[35, 3],[35, 4],[36, 3],[36, 4],
    [60, 47],[61,47],[62,47],
    [60, 48],[61,48],[62,48],
    [60, 49],[61,49],[62,49],
    [60, 51],[61,51],[62,51]
]
var gol= new GOL(number_of_elements);
gol.init();
gol.set_start_option(start_option);
