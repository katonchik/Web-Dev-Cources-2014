BinaryTree = function () {
    this.tree = {};

    /**
     * searchValue (int)- value that you want to find
     * function return array first is subtree which contains found value, second is parent that contains subtree
     * , and the third pointer from parent to subtree
     * @param searchValue
     * @returns {Array}
     */
    this.search = function (searchValue) {
        var searchResult=[];

        function searchValue(value, subtree) {
            searchResult[0] = subtree;
            if (subtree.value == value) {

            } else {
                if (subtree.value > value) {
                    searchResult[1] = subtree;
                    searchResult[2] = "left";
                    searchValue(value, subtree.left);
                } else {
                    searchResult[1] = subtree;
                    searchResult[2] = "right";
                    searchValue(value, subtree.right);
                }
            }
        }

        searchValue(searchValue, this.tree);
        return searchResult;
    };

};
/**
 * add new tree leaf with defined value(Int)
 * @param value
 */
BinaryTree.prototype.add = function (value) {

    function treeWalk(value, subtree) {
        if (subtree.value > value) {
            if (subtree.left == null) {
                subtree.child++;
                subtree.left = newNode;

            } else {
                treeWalk(value, subtree.left)
            }

        } else {
            if (subtree.right == null) {
                subtree.child++;
                subtree.right = newNode;

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
        value: value
    };
    if (this.tree.value) {
        treeWalk(value, this.tree);
    } else {
        this.tree = newNode;
    }
};
/**
 * create binary tree
 * @param numberOfElements
 */
BinaryTree.prototype.create = function (numberOfElements) {
    var array = generatorRandomSet(numberOfElements);
    array.forEach(function (el) {
        binaryTree.add(el)
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
    var subtree = this.subtree;
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
    var search=this.search(value);
    var subtree = search[0];
    var parentSubtree=search[1];
    var pointer=search[2];
    var successor;
//binary tree removing algorithms
//if subtree without children then it will be removed
//if subtree with one child then it will be replaced onto child
//if subtree with children then it will be replaced onto the last right child(child with the biggest value)
    if (subtree.child == 0) {
        parentSubtree[pointer] = null;
        console.log("0",subtree);
    } else if (subtree.child == 1) {
        parentSubtree[pointer] = subtree.left || subtree.right;
    } else {
        successor = this.searchMinMaxValueOfSubtree(subtree, false);
        console.log(successor);
        this.remove(successor.value);
        parentSubtree[pointer].value = successor.value;
    }
};


BinaryTree.prototype.render = function () {
    function renderNode(node) {
        var leftNode = "";
        var rightNode = "";
        if (node.left) {
            leftNode = renderNode(node.left);
        }
        if (node.right) {
            rightNode = renderNode(node.right);
        }
        return '' +
            '<div class="dom-node">' +
            '<div class="node-value">' + node.value + '</div>' +
            '<div class="left-node">' + leftNode + '</div>' +
            '<div class="right-node">' + rightNode + '</div>' +
            '</div>'
    }

    var rootEl = document.createElement("div");
    rootEl.innerHTML = renderNode(this.tree);
    return rootEl;
};

var binaryTree = new BinaryTree();
binaryTree.create(10);


console.log(binaryTree.tree);
var binaryView = binaryTree.render();
document.body.appendChild(binaryView);
