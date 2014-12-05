var BinaryTree = function () {
    this.search = function(element) {
        if ( !node ) {
            console.log ("There is no node element");
        }

        if ( element = node ) {
            console.log ("Found it!");
        }

        if ( node > element ) {
            node = left;
        } else {
            node = right;
        }
    }

    this.insert = function ( element ) {
        if ( !node ) {
            node = element;
        }

        if ( node > element ) {
            node = left;
        } else {
            node = right;
        }
    }

    this.remove = function ( element ) {}
}
