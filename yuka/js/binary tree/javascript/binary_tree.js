var container = document.getElementsByClassName("tree-container")[0];
container.innerHTML = "";

var someArray = generateRandomArray(15);


//-----------BEGIN of BinaryTree------------
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
        } else if (subtree.value < newNode.value )  {
            if (subtree.right === undefined) {
                subtree.right = newNode
            } else {
                domWalk (value, subtree.right)
            }
        } else {
            console.log("there already is such value: " + value);
        }
    }

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
    return value;
};

BinaryTree.prototype.find = function (value) {
    function domWalk (value, subtree) {
        if (subtree.value > value) {
            if (subtree.left === undefined) {
                console.log("nope");
            } else {
                domWalk(value, subtree.left)
            }
        } else if (subtree.value < value) {
            if (subtree.right === undefined) {
                console.log("nope");
            } else {
                domWalk(value, subtree.right)
            }
        } else {
            console.log("yep");
        }
    }

    if (this.tree.value) {
        domWalk (value, this.tree);
    } else {
        console.log("there is no tree");
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
    }


    var rootEl = document.createElement("div");

    rootEl.innerHTML = renderNode(this.tree);
    return rootEl;
};
//-----------END of BinaryTree------------


var newTree = new BinaryTree();


//Interval for step drawing
var i = 0;
var interval = setInterval(function() {
    newTree.add(someArray[i]);
    container.innerHTML = "";
    container.appendChild(newTree.render());
    i++;
    if (i >= someArray.length) {
        clearInterval(interval);
    }
},500);
