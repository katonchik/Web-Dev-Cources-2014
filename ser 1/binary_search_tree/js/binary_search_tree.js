function BinarySearchTree() {
    this.rootNode = null;
}
BinarySearchTree.prototype = {
    add: function (value){
        // new item object, place data in
        var node = {
            value: value,
            left: null,
            right: null
        },
        current;

        // set as root if rootNode is empty
        if (this.rootNode === null){
            this.rootNode = node;
        } else {
            current = this.rootNode;

            while(true){
                //if the new value is less than this node's value, go left
                if (value < current.value){
                    //if there's no left, then the new node belongs there
                    if (current.left === null){
                        current.left = node;
                        break;
                    } else {
                        current = current.left;
                    }
                //if the new value is greater than this node's value, go right
                } else if (value > current.value){
                    //if there's no right, then the new node belongs there
                    if (current.right === null){
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
    find: function(value){
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
        return found; 
    },
    remove: function(value){
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
    },
    
    /**
     * Returns the number of items in the tree
     * @return {int} The number of items in the tree.
     * @method size
     */
    size: function(){
        var length = 0;
        
        this.traverse(function(node){
            length++;
        });
        
        return length;
    },
    
    /**
     * Converts the tree into an array.
     * @return {Array} An array containing all of the data in the tree.
     * @method toArray
     */
    toArray: function(){
        var result = [];
        
        this.traverse(function(node){
            result.push(node.value);
        });
        
        return result;
    },
    
    /**
     * Converts the list into a string representation.
     * @return {String} A string representation of the list.
     * @method toString
     */
    toString: function(){
        return this.toArray().toString();
    },
    
    /**
     * Traverses the tree and runs the given method on each node it comes
     * across while doing an in-order traversal.
     * @param {Function} process The function to run on each node.
     * @return {void}
     * @method traverse
     */
    traverse: function(process){
        function inOrder(node){
            if (node){
                //traverse the left subtree
                if (node.left !== null){
                    inOrder(node.left);
                }            
                //call the process method on this node
                process.call(this, node);
                //traverse the right subtree
                if (node.right !== null){
                    inOrder(node.right);
                }
            }        
        }
        inOrder(this.rootNode);    
    }
};

var tree = new BinarySearchTree();

tree.add(5);
tree.add(30);
tree.add(16);
tree.add(11);
tree.add(44);
tree.add(2);

tree.remove(16);
tree.remove(100);

tree.find(11);


console.log('tree array: ' + tree.toString());
console.log('tree size: ' + tree.size());
console.log('tree root value: ' + tree.rootNode.value);
console.log('check if tree has node with value \'11\': ' + tree.find(11) );
console.log('check if tree has node with value \'100\': ' + tree.find(100));

