function BinarySearchTree() {
    this._root = null;
}

BinarySearchTree.prototype = {
    constructor: BinarySearchTree, //restore constructor

    add: function (value) {
        //create a new item object, place data in
        var node = {
            value: value,
            left: null,
            right: null
        };
        var current; //used to traverse the structure

        //special case: no items in the tree yet
        if (this._root === null) {
            this._root = node;
        } else {
            current = this._root;

            while (true) {
                //if the new value is less than this node's value, go left
                if (value < current.value) {
                    //if there's no left, then the new node belongs there
                    if (current.left === null) {
                        current.left = node;
                        break;
                    } else {
                        current = current.left;
                    }
                    //if the new value is greater than this node's value, go right
                } else if (value > current.value) {
                    //if there's no right, then the new node belongs there
                    if (current.right === null) {
                        current.right = node;
                        break;
                    } else {
                        current = current.right;
                    }
                    //if the new value is equal to the current one, just ignore
                } else {
                    break;
                }
            }
        }
    },

    contains: function (value) {
        var found = false;
        var current = this._root;
        //make sure there's a node to search
        while (!found && current) {
            //if the value is less than the current node's, go left
            if (value < current.value) {
                current = current.left;
                //if the value is greater than the current node's, go right
            } else if (value > current.value) {
                current = current.right;
            } else {
                found = true; //values are equal, found it!
            }
        }
        return found; //only proceed if the node was found
    },

    remove: function (value) {
        var found = false,
            parent = null,
            current = this._root,
            childCount,
            replacement,
            replacementParent;

        //make sure there's a node to search
        while (!found && current) {
            //if the value is less than the current node's, go left
            if (value < current.value) {
                parent = current;
                current = current.left;
                //if the value is greater than the current node's, go right
            } else if (value > current.value) {
                parent = current;
                current = current.right;

                //values are equal, found it!
            } else {
                found = true;
            }
        }

        //only proceed if the node was found
        if (found) {
            //figure out how many children
            childCount = (current.left !== null ? 1 : 0) +
            (current.right !== null ? 1 : 0);
            //special case: the value is at the node
            if (current === this._root) {
                switch (childCount) {
                    case 0: //no children, just erase the node
                        this._root = null;
                        break;
                    case 1: //one child, use one as the node
                        this._root = (current.right === null ?
                            current.left : current.right);
                        break;
                    case 2: //two children
                        //new node will be the old node's left child
                        replacement = this._root.left;
                        //find the right-most leaf node to be the real new node
                        while (replacement.right !== null) {
                            replacementParent = replacement;
                            replacement = replacement.right;
                        }
                        //it's not the first node on the left
                        if (replacementParent !== null) {
                            //remove the new node from it's previous position
                            replacementParent.right = replacement.left;
                            //give the new node all of the old node's children
                            replacement.right = this._root.right;
                            replacement.left = this._root.left;
                        } else {
                            replacement.right = this._root.right; //just assign the children
                        }
                        //officially assign new node
                        this._root = replacement;
                    //no default
                }
                //non-node values
            } else {
                switch (childCount) {
                    case 0: //no children, just remove it from the parent
                        //if the current value is less than its parent's, null out the left pointer
                        if (current.value < parent.value) {
                            parent.left = null;
                            //if the current value is greater than its parent's, null out the right pointer
                        } else {
                            parent.right = null;
                        }
                        break;
                    case 1: //one child, just reassign to parent
                        //if the current value is less than its parent's, reset the left pointer
                        if (current.value < parent.value) {
                            parent.left = (current.left === null ? current.right : current.left);
                            //if the current value is greater than its parent's, reset the right pointer
                        } else {
                            parent.right = (current.left === null ? current.right : current.left);
                        }
                        break;
                    case 2: //two children
                        //reset pointers for new traversal
                        replacement = current.left;
                        replacementParent = current;
                        //find the right-most node
                        while (replacement.right !== null) {
                            replacementParent = replacement;
                            replacement = replacement.right;
                        }
                        replacementParent.right = replacement.left;
                        //assign children to the replacement
                        replacement.right = current.right;
                        replacement.left = current.left;
                        //place the replacement in the right spot
                        if (current.value < parent.value) {
                            parent.left = replacement;
                        } else {
                            parent.right = replacement;
                        }
                    //no default
                }
            }
        }
    },

    traverse: function (process) {
        function inOrder(node) { //helper function
            if (node) {
                //traverse the left subtree
                if (node.left !== null) {
                    inOrder(node.left);
                }
                //call the process method on this node
                process.call(this, node);
                //traverse the right subtree
                if (node.right !== null) {
                    inOrder(node.right);
                }
            }
        }

        //start with the node
        inOrder(this._root);
    },

    size: function () {
        var length = 0;
        this.traverse(function (node) {
            length++;
        });
        return length;
    },

    toArray: function () {
        var result = [];
        this.traverse(function (node) {
            result.push(node.value);
        });
        return result;
    },

    toString: function () {
        return this.toArray().toString();
    }
};

