/**
 * swaps elements in arr
 * @param a
 * @param b
 * @param c
 * @param d
 */
function swap(a,b,c,d) {
    // temp = arr[i];
    d = a[b];
    // arr[i] = a[m]
    a[b] = a[c];
    // arr[m] = temp
    a[c] = d;
}