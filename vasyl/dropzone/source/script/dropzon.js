/**
 * e-element's event
 * function create input element which is can get the image
 * and then this image will  set as image of event owner element
  * @param e
 */
function createInputFileElement(e){
    var dragAndDrop =document.createElement('input');
    dragAndDrop.setAttribute("accept","image/*")
    dragAndDrop.setAttribute("type","file")
    dragAndDrop.addEventListener('change',function(event){handleFiles(event.target.files, e.srcElement);})
    if (dragAndDrop) {
        dragAndDrop.click();
    }
}
/**
 *e -element's event
 * @param e
 * @returns {boolean}
 */
function switchToInputFile(e) {
createInputFileElement(e);
    return false;

}
/**
 *function take files from
 * @param files
 * @param src
 */
function handleFiles(files,src) {
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var imageType = /image.*/;
        if (!file.type.match(imageType)) {
            continue;
        }
        var img = src;
        img.file = file;
        //console.log(img.src)
       // img.setAttribute('src',file.src);
        var reader = new FileReader();
        reader.onload = (function (aImg) {
            return function (e) {
                aImg.src = e.target.result;
            };
        })(img);
        return reader.readAsDataURL(file);
    }
}
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
   var a= ev.dataTransfer.files;
    console.log(a)
}
/**
 *
 * @param ev
 */
function drop(ev) {
    ev.preventDefault();
    var dt = ev.dataTransfer;
    var files = dt.files;
     handleFiles(files,ev.srcElement)
}


