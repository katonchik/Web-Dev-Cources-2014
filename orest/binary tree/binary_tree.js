// Binary Tree

var someArray = [5, 2, 8, 6, 1, 7, 3, 9, 4, 10]

// Creating an Object using a function
function BinaryTreeCreate(someArray, value) {
    this.root = null;
    this.value = value;
}

BinaryTreeCreate.prototype.setLeft = function(left) {
     this.left = left;
}

BinaryTreeCreate.prototype.setRight = function(right) {
     this.right = right;
}

BinaryTreeCreate.prototype.add = function(value) {
    var node = {
        value: value;
        left: null;
        right: null;
    };
    var current;

    //check if this is the first node of a tree
    if (this.root === null) {
        this.root = node;
    }
    else {
        current = node;
    }
}

