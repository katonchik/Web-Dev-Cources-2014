function BinaryTreeSearch(value) {
    this.rootNode = value || null;
    this.right = null;
    this.left = null;
}

BinaryTreeSearch.prototype = {
    // for testing purposes
    checkTree: function(){
        console.log('root item: ' + this.rootNode);
        console.log('left item: ' + this.left);
        console.log('right item: ' + this.right);
    },

    add: function(value) {
        var node = value;
        var current;

        // if rootNode is empty we set first item as root
        if (this.rootNode === null) {
            this.rootNode = node;
        } else {
            current = this.rootNode;

            while(true) {
                // if entered val is less than root we go left
                if (value < current) {

                    // if leftbranch el is null we set item as leftbranch-item
                    if (this.left === null){
                        this.left = node;
                        break;
                    } else {
                        current = this.left;
                    }
                // if entered val is less than root we go left
                } else if (value > current) {
                    // if rightbranch el is null we set item as rightbranch-item
                    if (this.right === null){
                        this.right = node;
                        break;
                    } else {
                        current = this.right;
                    }
                } else {
                    break;
                }
            }
        }

    }
};

var tree = new BinaryTreeSearch(45);
tree.add(15);
tree.add(47);
tree.checkTree();

