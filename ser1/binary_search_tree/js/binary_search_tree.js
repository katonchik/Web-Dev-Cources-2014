someArray = [];
function BinarySearchTree() {
    this.rootNode = {};
    this.traverse = function (process){
        function inOrder(node){
            if (node){
                if (node.left !== null){
                    inOrder(node.left);
                }            
                process.call(this, node);
                if (node.right !== null){
                    inOrder(node.right);
                }
            }        
        }
        inOrder(this.rootNode);    
    }
    this.findNode = function(value){
        var found = false,
        current = this.rootNode;

        while(!found && current){
            //if the value is less than the current node > go left
            if (value < current.value){
                current = current.left;
            //if the value is greater than the current node > go right
            } else if (value > current.value){
                current = current.right;
            } else {
                found = true;
            }
        }
        return { found: found };
    }
}
BinarySearchTree.prototype.add = function(value){
    var node = {
        value : value,
        left : null,
        right : null
    };
    addNode = function (value, subtree) {
        if (subtree.value > value ) {
            if (subtree.left === null) {
                subtree.left = node
            } else {
                addNode (value, subtree.left)
            }
        } else {
            if (subtree.right === null) {
                subtree.right = node
            } else {
                addNode (value, subtree.right)
            }
        }
    }
    if (this.rootNode.value) {
        addNode (value, this.rootNode);
    } else {
        this.rootNode = node;
    }
    console.log("node " + value + " is added");
}
BinarySearchTree.prototype.toArray = function(value){
    var result = [];
    this.traverse(function(node){
        result.push(node.value);
    });

    return result;
}
BinarySearchTree.prototype.find = function(value){
    var foundResult = this.findNode(value),
        foundItem = foundResult.found;

    if(foundItem){
        console.log("node " + "'" + value + "'" + " found");    
    }else{
        console.log("node " + "'" + value + "'" +  " is not found")
    }
}
BinarySearchTree.prototype.remove = function(value){
    var found = false,
        parent = null,
        current = this.rootNode,
        childCount,
        replacement,
        replacementParent;

    while (!found && current){
        //if the value is less than the current node > go left
        if (value < current.value){
            parent = current;
            current = current.left;
        //if the value is greater than the current node > go right
        } else if (value > current.value){
            parent = current;
            current = current.right;
        } else {
            found = true;
        }
    }

    if (found){
        //count children
        childCount = (current.left !== null ? 1 : 0) + (current.right !== null ? 1 : 0);
    
        //special case: the value is at the root
        if (current === this.rootNode){
            switch(childCount){
                //if no children > just remove the root
                case 0:
                    this.rootNode = null;
                    break;
                //if one child, use one as the root
                case 1:
                    this.rootNode = (current.right === null ? current.left : current.right);
                    break;
                case 2:
                    //new root will be the old root's left child...maybe
                    replacement = this.rootNode.left;
                    //find the right-most leaf node to be the real new root
                    while (replacement.right !== null){
                        replacementParent = replacement;
                        replacement = replacement.right;
                    }
                    //it's not the first node on the left
                    if (replacementParent !== null){
                        //remove the new root from it's previous position
                        replacementParent.right = replacement.left;
                        
                        //give the new root all of the old root's children
                        replacement.right = this.rootNode.right;
                        replacement.left = this.rootNode.left;
                    } else {
                        //just assign the children
                        replacement.right = this.rootNode.right;
                    }
                    //officially assign new root
                    this.rootNode = replacement;
                //no default
            }        
        //non-root values
        } else {
            switch (childCount){
                //no children, just remove it from the parent
                case 0:
                    //if the current value is less than its parent's, null out the left pointer
                    if (current.value < parent.value){
                        parent.left = null;
                        
                    //if the current value is greater than its parent's, null out the right pointer
                    } else {
                        parent.right = null;
                    }
                    break;
                //one child, just reassign to parent
                case 1:
                    //if the current value is less than its parent's, reset the left pointer
                    if (current.value < parent.value){
                        parent.left = (current.left === null ? current.right : current.left);
                        
                    //if the current value is greater than its parent's, reset the right pointer
                    } else {
                        parent.right = (current.left === null ? current.right : current.left);
                    }
                    break;    
                //two children, a bit more complicated
                case 2:
                    //reset pointers for new traversal
                    replacement = current.left;
                    replacementParent = current;
                    
                    //find the right-most node
                    while(replacement.right !== null){
                        replacementParent = replacement;
                        replacement = replacement.right;                            
                    }
                    replacementParent.right = replacement.left;
                    
                    //assign children to the replacement
                    replacement.right = current.right;
                    replacement.left = current.left;
                    
                    //place the replacement in the right spot
                    if (current.value < parent.value){
                        parent.left = replacement;
                    } else {
                        parent.right = replacement;
                    }                                    
                //no default
            }
        }
    }
}


var tree = new BinarySearchTree();
treeArray = tree.toArray();
tree.add(5);
tree.add(30);
tree.add(16);
tree.add(11);
tree.add(44);
tree.add(2);
tree.remove(16);
tree.find(11);
tree.find(100);
tree.find(16);