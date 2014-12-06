// Binary Tree

// Creating an Object using a function
function BinaryTreeCreate(name, value) {
    this.name = name;
    this.value = value;
}

BinaryTreeCreate.prototype.setLeft = function(left) {
     this.left = left;
}

BinaryTreeCreate.prototype.setRight = function(right) {
     this.right = right;
}

