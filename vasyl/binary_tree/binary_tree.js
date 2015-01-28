BinaryTree = function () {
    this.tree = {};
    this_ = this;
    /**
     * searchValue (int)- value that you want to find
     * function return array first is subtree which contains found value, second is parent that contains subtree
     * , and the third pointer from parent to subtree
     * @param searchValue
     * @returns {Array}
     */
    this.search = function (searchValue) {
        var searchResult = [];
        function findValue(value, subtree) {
            searchResult[0] = subtree;
            if (subtree.value == value) {

            } else {
                if (subtree.value > value) {
                    searchResult[1] = subtree;
                    searchResult[2] = "left";
                    findValue(value, subtree.left);
                } else {
                    searchResult[1] = subtree;
                    searchResult[2] = "right";
                    findValue(value, subtree.right);
                }
            }
        }

        findValue(searchValue, this.tree);
        return searchResult;
    };

};
/**
 * add new tree leaf with defined value(Int)
 * @param value
 */
BinaryTree.prototype.add = function (value) {
    var firstElementXasis = 50;//in percent
    var heightBetweenElements = 50;// in px
    var c = 0;

    function treeWalk(value, subtree) {
        c = firstElementXasis / (Math.pow(2, subtree.y / heightBetweenElements));
        if (subtree.value > value) {
            if (subtree.left == null) {
                subtree.child++;
                subtree.left = newNode;
                subtree.left.x = subtree.x - c;
                subtree.left.y = subtree.y + heightBetweenElements;
            } else {
                treeWalk(value, subtree.left)
            }

        } else {
            if (subtree.right == null) {
                subtree.child++;
                subtree.right = newNode;
                subtree.right.x = subtree.x + c;
                subtree.right.y = subtree.y + heightBetweenElements;
            }
            else {
                treeWalk(value, subtree.right)
            }
        }
    }

    var newNode = {
        left: null,
        right: null,
        child: 0,
        value: value,
        x: firstElementXasis,
        y: heightBetweenElements
    };
    if (this.tree.value) {
        treeWalk(value, this.tree);
    } else {
        this.tree = newNode;
    }
    this.render();
};
/**
 * create binary tree
 * @param numberOfElements
 */
BinaryTree.prototype.create = function (numberOfElements) {
    var array = generatorRandomSet(numberOfElements);
    console.log(array);
    array.forEach(function (el) {
        this_.add(el)
    });
};
/**par -subtree instance in which we going to search min max values
 * switcher -Boolean , using to switch search between min(true) and max(false) values
 * @param subtree
 * @param switcher
 * @returns {Object}
 */
BinaryTree.prototype.searchMinMaxValueOfSubtree = function (subtree, switcher) {
    var result;
    var parameter;
    var subtree = subtree;
    if (switcher) {
        parameter = "left";
    }
    else {
        parameter = "right";
    }

    function search(subtree) {
        result = subtree;
        if (subtree[parameter] == null) {


        } else {
            search(subtree[parameter]);
        }
    }

    search(subtree);
    return result;
};
/**
 * remove element(leaf) of binary tree with defined value
 * @param value
 */
BinaryTree.prototype.remove = function (value) {
    var searchResult = this.search(value);
    var subtree = searchResult[0];
    var parentSubtree = searchResult[1];
    var pointer = searchResult[2];
    var successor;
//binary tree removing algorithms
//if subtree without children then it will be removed
//if subtree with one child then it will be replaced onto child
//if subtree with children then it will be replaced onto the last right child(child with the biggest value)
    if (subtree.child == 0) {
        parentSubtree[pointer] = null;
    } else if (subtree.child == 1) {
        parentSubtree[pointer] = subtree.left || subtree.right;
    } else {
        successor = this.searchMinMaxValueOfSubtree(subtree.right, true);
        //console.log(successor);
        this.remove(successor.value);
        parentSubtree[pointer].value = successor.value
    }
    this.render(true);
};

/**function draw binary tree * *
 * if switcher true it's calculate coordinates of  tree elements *
 * @param switcher
 */
BinaryTree.prototype.render = function (switcher) {
    document.body.innerHTML = "";
    var svgNS = "http://www.w3.org/2000/svg";
    function renderNode(node) {
        //if(switcher){calculateXY(node)}
        if (node.left) {
            if (switcher) {
                calculateXY(node.left)
            }
            rootEl.appendChild(addSvgLine(node.x, node.y, node.left.x, node.left.y));
            renderNode(node.left);
        }
        if (node.right) {
            if (switcher) {
                calculateXY(node.right)
            }
            rootEl.appendChild(addSvgLine(node.x, node.y, node.right.x, node.right.y));
            renderNode(node.right);
        }
        rootEl.appendChild(createCircle(node.x, node.y))
        rootEl.appendChild(addSvgText(node.x, node.y, node.value))

    }


    function calculateXY(node) {
        var subtree = this_.tree;
        var firstElementXasis = 50;//in percent
        var heightBetweenElements = 50;// in px
        var c = 0;
        var x = firstElementXasis;
        var y = heightBetweenElements;
        while (subtree.value != node.value) {
            c = 50 / (Math.pow(2, y / heightBetweenElements))
            if (subtree.value > node.value) {
                x -= c;
                subtree = subtree.left;
            } else {
                x += c;
                subtree = subtree.right;
            }
            y = y + heightBetweenElements;
        }
        node.x = x;
        node.y = y;
        return node;
    }


    function createCircle(x, y) {
        var circle = document.createElementNS(svgNS, 'circle');
        circle.classList.add('svg');
        circle.setAttribute('r', '15');
        circle.setAttribute('cx', x + '%');
        circle.setAttribute('cy', y);
        return circle;
    }

    function addSvgText(x, y, value) {
        var newText = document.createElementNS(svgNS, 'text');
        newText.setAttribute('x', x - 0.4 + '%');
        newText.setAttribute('y', y + 3);
        newText.setAttribute('font-size', '10');
        var textNode = document.createTextNode(value);
        newText.appendChild(textNode);
        return newText;
    }

    function addSvgLine(x1, y1, x2, y2) {
        var line = document.createElementNS(svgNS, 'line');
        line.classList.add('svg');
        line.setAttribute('x1', x1 + '%');
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2 + '%');
        line.setAttribute('y2', y2);
        return line;
    }

    var rootEl = document.createElementNS(svgNS, 'svg');
    rootEl.setAttribute('width', '100%');
    rootEl.setAttribute('height', '1000');
    renderNode(this.tree );
    document.body.appendChild(rootEl);
};


var binaryTree = new BinaryTree();
binaryTree.create(10);
console.log(binaryTree.tree);
var binaryView = binaryTree.render();
//document.body.appendChild(binaryView);



