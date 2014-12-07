/**
 * Binary Search Tree implementation in pure JavaScript.
 * In this implementation keys are unique and duplicates are not allowed.
 * Has public methods like: add, remove, find, traverse in-order, traverse pre-order.
 * @class BinarySearchTree
 * @constructor
 */
function BinarySearchTree() {
    'use strict';
    var _self = this,
		rootNode = null,  // tree root, by default is null
        rootRemovalCases = [],  // array of functions to delete root
        nodeRemovalCases = []; // array of functions to delete node

    /**
     * Public method Add.
     * Adds new node to tree. If tree is empty first added node will be root.
     * @param key {Number} New nodes key. Max = 100. Key is unique and can't be repeated.
     * @param value {String} New nodes value.
     */
    _self.add = function(key, value){
        var keyInt = Math.ceil(parseInt(key, 10));

        // if entered key isn't typeof Number or bigger than 100 - return false
        if (isNaN(keyInt) || keyInt > 100) return false;

        // if tree doesn't have root, first added node will be root
        if (rootNode == null) {
            rootNode = new Node(key, value, null, null);
            return rootNode;
        } else {
            addNode(rootNode, key, value);
        }
    };

    /**
     * Public method Remove.
     * Removes node from tree.
     * @param key {Number} Key of node that needs to be removed.
     */
    _self.remove = function(key) {
        var foundResults = findNode(key), // values returned by private function findNode
            itemToRemove = foundResults.foundItem, // node to be removed
            parent = foundResults.parentOfFoundItem, // parent of node to be removed
            found = foundResults.found, // boolen, if item is found - true, if not - false
            amountOfChildren;

        if (found) {
            //find how many children has node to be removed
            amountOfChildren = countChildren(itemToRemove);

            // if node to be removed is root - remove root, else find a needed node and remove
            if (itemToRemove == rootNode) {
                rootRemovalCases[amountOfChildren](itemToRemove);
            } else {
                nodeRemovalCases[amountOfChildren](itemToRemove, parent);
            }
        }
    };

    /**
     * Public method Remove.
     * Finds Node by it's key.
     * @param key {Number} Key of node that is being searched
     */
    _self.find = function(key) {
        var foundResults = findNode(key), // values returned by private function findNode
            searchedItem = foundResults.foundItem, // searched node
            parent = foundResults.parentOfFoundItem, // parent of searched node
            found = foundResults.found; // boolen, if item is found - true, if not - false

        if (found) {
            console.log('node with key ' + searchedItem.key + ' is found!');
            console.log('found node value = ' + searchedItem.value + '!');
            console.log('found node parent key = ' + (parent.key || 'document') + '!');
        } else {
            console.log('sorry! node with key ' + key + ' isn\'t found!');
        }
    };

    /**
     * Public method TravelsalInOrder.
     * Traverses Tree with in-order traversal type.
     */
     _self.traversalInOrder = function() {
	visitInOrder(rootNode);
     };

    /**
     * Public method TravelsalPreOrder.
     * Traverses Tree with pre-order traversal type.
     */
    _self.traversalPreOrder = function () {
        visitPreOrder(rootNode);
    };

    /**
     * Removes root in case root has no children.
     * @param itemToRemove {Object}
     */
    rootRemovalCases[0] = function(itemToRemove) {
        rootNode = null;
    };

    /**
     * Removes root in case it has one child.
     * @param itemToRemove {Object}
     */
    rootRemovalCases[1] = function(itemToRemove) {
        rootNode = (itemToRemove.rightChild == null ? itemToRemove.leftChild : itemToRemove.rightChild);
        rootNode.value = 'new Root';
    };

    /**
     * Removes root in case it has two children.
     * To keep tree balanced we need to switch nodes places.
     * @param itemToRemove {Object}
     */
    rootRemovalCases[2] = function(itemToRemove) {
        var successor, successorParent; // node that will became new root and its parent

        // go right to find root successor
        successor = rootNode.rightChild;
        // search for most left node of roots right child
        while (successor.leftChild != null){
            successorParent = successor;
            successor = successor.leftChild;
        }

        // if successor parent is not the old root
        if (successorParent != null){
            // remove successor from its position,
            // place successors right child on successors place
            successorParent.leftChild = successor.rightChild;
            // assign old roots children to new root
            successor.leftChild = rootNode.leftChild;
            successor.rightChild = rootNode.rightChild;
        } else {
            // if successor parent is root, assign old roots leftChild to new root
            successor.leftChild = rootNode.leftChild;
        }
        // assign new root
        rootNode = successor;
        rootNode.value = 'new Root';
    };

    /**
     * Removes node in case it doesn't have any children.
     * @param itemToRemove {Object}
     * @param parent {Object}
     */
    nodeRemovalCases[0] = function(itemToRemove, parent) {
        // if key of item to remove is less than its parent's - remove its parent's left child
        if (itemToRemove.key < parent.key){
            parent.leftChild = null;
        // if key of item to remove is greater than its parent's - remove its parent's left child
        } else {
            parent.rightChild = null;
        }
    };

    /**
     * Removes node in case it has one child.
     * @param itemToRemove {Object}
     * @param parent {Object}
     */
    nodeRemovalCases[1] = function(itemToRemove, parent) {
        // if key of item to remove is less than its parent's - remove its parent's left child
        if (itemToRemove.key < parent.key){
            parent.leftChild = (itemToRemove.leftChild == null ? itemToRemove.rightChild : itemToRemove.leftChild);
        // if key of item to remove is greater than its parent's - remove its parent's left child
        } else {
            parent.rightChild = (itemToRemove.leftChild == null ? itemToRemove.rightChild : itemToRemove.leftChild);
        }
    };

    /**
     * Removes node in case it has two children.
     * To keep tree balanced we need to switch nodes places.
     * @param itemToRemove {Object}
     * @param parent {Object}
     */
    nodeRemovalCases[2] = function(itemToRemove, parent) {
        var successor, successorParent; // node that will replace deleted node, and its parent

        successor = itemToRemove.leftChild;
        successorParent = itemToRemove;

        // search for most left of node to be removed right child
        while(successor.leftChild != null){
            successorParent = successor;
            successor = successor.leftChild;
        }

        // assign children to the node that will replace deleted one
        successor.rightChild = itemToRemove.rightChild;
        if(itemToRemove.key != successorParent.key) {
            successorParent.rightChild = successor.leftChild;
            successor.leftChild = itemToRemove.leftChild;
        }
        // place successor into correct place
        if (itemToRemove.key < parent.key){
            parent.leftChild = successor;
        } else {
            parent.rightChild = successor;
        }
    };

    /**
     * Calculates children amount of node.
     * @param node {Object} Node which children we need to calculate.
     * @returns {Number} Amount of children.
     */
    function countChildren(node) {
        var childrenAmount = 0;

        node.leftChild != null ? childrenAmount += 1 : 0;
        node.rightChild != null ? childrenAmount += 1 : 0;

        return childrenAmount;
    }

    /**
     * Finds node by entered key.
     * @param key {Number} Key of node that is being searched.
     * @returns {Object} Object contains found node, parent of found node, boolean
     */
    function findNode(key) {
        var found = false,
            itemToFind = rootNode, // start searching from root
            parent; // parent of node we're looking for

        // if searched node is root we set his parent to be document
        if (key == rootNode.key) {
            parent = document;
        }

        while(!found){
            // stop searching if there's no searched node
            if (!itemToFind) {
                break;
            }
            // if entered key is less than current node we go left
            if (key < itemToFind.key){
                parent = itemToFind;
                itemToFind = itemToFind.leftChild;
            // if entered key is greater than current node we go right
            } else if (key > itemToFind.key){
                parent = itemToFind;
                itemToFind = itemToFind.rightChild;
            } else {
                found = true;
            }
        }

        return {
            foundItem: itemToFind,
            parentOfFoundItem: parent,
            found: found
        };
    }

    /**
     * Adds new node into tree.
     * @param node {Object} Node in which we add new child(node).
     * @param key {Number} Key of new node.
     * @param val {String} Value of new node.
     * @returns {Object} New created node.
     */
    function addNode(node, key, val) {
        /* if entered key is less than current node key we go left,
         *  if current node has no left child we add new node to be it's left child,
         *  else we go further left
         */
        if (key < node.key) {
            if (!node.leftChild) {
                node.leftChild = new Node(key, val, null, null);
            } else {
                addNode(node.leftChild, key, val);
            }
        /* if entered key is greater than current node key we go right,
         *  if current node has no right child we add new node to be it's right child,
         *  else we go further right
         */
        } else if (key > node.key) {
            if (!node.rightChild) {
                node.rightChild = new Node(key, val, null, null);
            } else {
                addNode(node.rightChild, key, val);
            }
        // if entered key already exists in tree - return. No duplicates are allowed.
        } else {
            return;
        }

        return node;
    }

    /**
     * Prints node's key and value
     * @param node {Object}
     */
	function visit(node) {
		console.log('Key: ' + node.key + ", Value: " + node.value);
	}

    /**
     * Traverses tree in-order way.
     * @param node {Object}
     */
	function visitInOrder(node) {
	  if (!node) return;

	  visitInOrder(node.leftChild);
	  visit(node);
	  visitInOrder(node.rightChild);
	}

    /**
     * Traverses tree pre-order way.
     * @param node {Object}
     */
    function visitPreOrder(node) {
        if (!node) return;

        visit(node);
        visitPreOrder(node.leftChild);
        visitPreOrder(node.rightChild);
    }
}

var tree = new BinarySearchTree();

// test tree functionality
tree.add(26, 'Root item');
tree.add(24, '1 item');
tree.add(29, '2 item');
tree.add(27, '3 item');
tree.add(30, '4 item');
tree.add(11, '5 item');
tree.add(25, '6 item');

tree.traversalPreOrder();

tree.remove(24);

console.log('after removal:');
tree.traversalInOrder();

tree.find(29);
