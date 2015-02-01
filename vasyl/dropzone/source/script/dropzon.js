/**
 * e-element's event
 * function create input element which is can get the image
 * and then this image will  set as image of event owner element
 * @param e
 */
function createInputFileElement(e) {
    var dragAndDrop = document.createElement('input');
    dragAndDrop.setAttribute("accept", "image/*")
    dragAndDrop.setAttribute("type", "file")
    dragAndDrop.addEventListener('change', function (event) {
       // console.log(event);
        handleFiles(event.target.files, e.target);

    })
    if (dragAndDrop) {
        dragAndDrop.click();
    }
    return false;
}
/**
 *e -element's event
 * function called createInputFileElement
 * @param e
 * @returns {boolean}
 */
function createImgUploader(e) {
    createInputFileElement(e);
    return false;
}
/**
 *function take  file from param files and if this file
 *  is a image set it  as image to src owner's
 * @param files
 * @param src
 */
function handleFiles(files, src) {
    var file = files[0];
    var imageType = /image.*/;
    if (file.type.match(imageType)) {
        var img = src;
        img.file = file;
        console.log(img,img.file)
        //read file as url and set the img src equal to it
        var reader = new FileReader();
        reader.onload = (function (aImg) {
            return function (e) {
                console.log(e, aImg);
                aImg.src = e.target.result;
            };
        })(img);
        return reader.readAsDataURL(file);
    }
}
function allowDrop(ev) {
    ev.preventDefault();
}
/**
 * get url from event
 * @param ev
 */
function drag(ev) {
    ev.dataTransfer.setData("src",ev.target.src);
}
/**
 *drop file into the img
 * @param ev
 */
function drop(ev) {
    ev.preventDefault();
    //get files from drop event
      var dt = ev.dataTransfer;
      var files = dt.files;
     if(files.length>0){      //
      handleFiles(files, ev.target)
  }else {
        var data=ev.dataTransfer.getData("src");
        ev.target.setAttribute('src',data);
    }
}


