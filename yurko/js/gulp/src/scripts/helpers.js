define([], function () {
    function swap(argument1, argument2) {
        var tmp = argument1;
        argument1 = argument2;
        argument2 = tmp;
    }
    return {
             swap: swap;
    }
}