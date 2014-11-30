function Tree(tree_height) {
    var first = true;
    //var tree;

    function Branch(branch_height) {
        var this_ = this;
        this.root = [];
        var height = branch_height;
        var number = Math.round(Math.random() * 100);
        this_.number = number;
        this_.height = height;

        var width = 0;

        this_.create_random_tree = function () {

            if (first) {
                width = 1;
                first = false;
            }
            if (height < tree_height - 1)width = Math.round(Math.random() * 2);
            console.log(number, height, first, width);
            ++height;
            if (height < tree_height) {

                for (var i = 0; i < width; i++) {
                    this_.root[i] = new Branch(height)
                }
            }
        };
        if (height < tree_height)
            this_.create_random_tree();
    }


    var branches = new Branch(0);
    // branches.create_random_tree();
    this.add_branches = function (height, width, number) {
        var count = 0;

        function add(that) {
            if (height-1 > count) {
                count++;
                //console.log(that, "i'm here");
                return add(that.root[width-1]);
            }
            return that;
        }

        var a = add(branches);
        console.log(a);
        var length=a.root.length;
        a.root[length]=new Branch();
      //  a.root[length].number=number;
          a.root[length].height=height;
        // console.log(a.pop());
    };
    this.delete_branches=function(height,width ){
        var count = 0;

        function add(that) {
            if (height > count+1) {
                count++;
                //console.log(that, "i'm here");
                return add(that.root[0]);
            }
            return that;
        }
        var a=add(branches);
        console.log(a);
        a.root[width-1]=null;
    }
    this.out = function () {
        console.log(branches);
    }
}
var t = new Tree(3);

//t.add_branches(2, 2, 45);
//t.delete_branches(1,1);
t.out();
