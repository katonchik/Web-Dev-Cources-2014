/**
 * Binary Search Tree node constructor.
 * Returns new node.
 * All parameters default to null.
 * @param key {Number} - the key of node.
 * @param value {String} - the value of node.
 * @param leftChild {Object} - reference to the left child of the node
 * @param rightChild {Object} - reference to the right child of the node
 * @returns {Object}
 * @class Node
 * @constructor
 */
function Node(key, value, leftChild, rightChild) {
    return {
        key: key || null,
        value: value || null,
        leftChild: leftChild || null,
        rightChild: rightChild || null
    }
}