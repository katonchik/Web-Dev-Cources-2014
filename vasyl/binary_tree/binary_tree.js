Binary_Tree = function (set) {
    var this_ = this;
    var left = 0;
    var right = 1;
    var count = 0;
    var arr_set = set; // Array of values of tree
    var t_root =[];


    /**
     * create binary tree
     */
    this.create=function(){
        t_root=inseretion();
        this.t_root=t_root;
    };
    /**
     *
     * @param number - value that you want to find
     * @returns {Branch}
     */
    this.search = function (number) {
        var that=t_root;
        if(is_num_in_array(arr_set,number)){
            while (that.number != number) {
                // console.log(that.number, number, 2);
                if (that.number > number) {
                    // console.log(that, number, "l");

                    that = that.baranch_root[left];
                } else {
                    // console.log(that, number, "r");

                    that = that.baranch_root[right];
                }
            }
            //console.log(that.number);
            return that;}
        else{
            console.log("    oops")
            return null;
        }
    };

    /**
     * function find min or max value
     * @param par if value of param =1 that you find min element of tree else max
     * @param that(Branch)
     * @returns {Branch}
     */
    find_min_max=function(par,that){
        if(par==1)
            var parametr=left;
        else(parametr=right);

        while(that!=null){
            if (that.baranch_root[left] == null)
                break;
            that=  that.baranch_root[parametr];}
        return that;
    }
    /**
     *
     * @param that(Branch)
     * @returns {Branch}
     */
    function find_succesor(that){
        var succesor =find_min_max(1,that.baranch_root[right]);
        return succesor;

    }
    
    
    this.remove = function (number) {
        var that=  this.search(number);
        var succesor=null;
        if(that.child==0){
            console.log("0");
            that=null;
        }else if(that.child==1)
        {
            console.log("1");
            that=that.baranch_root[left]||that.baranch_root[right];
        }else{
            console.log("2");
            succesor=find_succesor(that);
            console.log(succesor);
            this.remove(succesor.number);
            that=succesor;
        }


    };


    /**
     * add new branches
     * @param array(Array) -Array of values which you want to add
     */
    this.add = function (array) {
        arr_set = make_set(arr_set.concat(array));
        inseretion();
    };

    /**
     * inseret branches in tree
     * @returns {Branch}
     */
    function inseretion() {
        var root;
        var that;
        while (count < arr_set.length) {
            var number = arr_set[count];
            if (count == 0) {
                root = new Branch(number,0);
                //console.log(root, number, 1);
                count++;
                continue;
            }

            that = root;
            while (that != null) {
                // console.log(that.number, number, 2);
                if (that.number > number) {
                    //console.log(that, number, "l");
                    if (that.baranch_root[left] == null) {
                        that.child++;
                        that = that.baranch_root[left] = new Branch(number,0);
                        break;
                    }
                    that = that.baranch_root[left];
                } else {
                    // console.log(that, number, "r");
                    if (that.baranch_root[right] == null) {
                        that.child++;
                        that = that.baranch_root[right] = new Branch(number,0);
                        break;
                    }
                    that = that.baranch_root[right];
                }
            }
            // console.log(root, 3);
            count++;
        }
        return root;
    }

    /**
     *
     * @param number -value of this branch
     * @param child - number of child
     * @constructor
     */
    function Branch(number,child) {
        var this_ = this;
        this_.child=child;
        this_.baranch_root = [null, null];
        this_.number = number;
    }

    /**
     * show sorted  Array of values of tree
     * and show tree root
     */
    this.out = function () {
        console.log(arr_set.sort(function (a, b) {
            return a - b
        }), arr_set.length);
        console.log(t_root);
    };

};
array=genrator_random_set(10);
console.log(array);
var t= new Binary_Tree(array);
t.create();
t.out();

//console.log(t.t_root);
//t.add().
