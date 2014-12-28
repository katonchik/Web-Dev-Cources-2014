// Binary Tree
var someArray = [5, 2, 8, 6, 1, 7, 3, 9, 4, 10];

// Creating an Object
function BinaryTree() {
    this.tree = {}
}

BinaryTree.prototype.add = function (value) {
    function domWalk (value, subtree) {
        if (subtree.value > newNode.value ) {
            if (subtree.left === undefined) {
                subtree.left = newNode
            } else {
                domWalk (value, subtree.left)
            }
        } else {
            if (subtree.right === undefined) {
                subtree.right = newNode
            } else {
                domWalk (value, subtree.right)
            }
        }
    };

    var newNode = {
        value : value,
        left : undefined,
        right : undefined
    };

    if (this.tree.value) {
        domWalk (value, this.tree);
    } else {
        this.tree = newNode;
    }
};


BinaryTree.prototype.render = function () {
    function renderNode (node) {
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
    };


    var rootEl = document.createElement("div");

    rootEl.innerHTML = renderNode(this.tree);
    return rootEl;
};


BinaryTree.prototype.asdfas  = 1;

var binaryTree = new BinaryTree();

someArray.forEach(function (el) {
    binaryTree.add(el);
});

console.log(binaryTree.tree);

var binaryView = binaryTree.render();
document.body.appendChild(binaryView);


