/**
 * Image Uploader Class.
 * Not finished yet.
*/
var Dropzone = function(htmlEl, userConfig) {
    var self = this;
    var inputFile;
    var elTarget;
    var thumbSize = {};
    var thumbClass = 'img-upload-thumb';
    var multipleThumbs = false;

    self.el;
    self.init = function() {
        createInputFile();
        initTargetEl();
        getThumbSize();

        elTarget.addEventListener('click', openFileDialog, false);
        elTarget.addEventListener('dragenter', dragEnter, false);
        elTarget.addEventListener('dragexit', dragExit, false);
        elTarget.addEventListener('dragover', dragOver, false);
        elTarget.addEventListener('drop', uploadThumb, false);
        inputFile.addEventListener('change', uploadThumb, false);
    }
    self.init();

    function initTargetEl() {
        elTarget =  htmlEl;

        if (!elTarget) {
            return;
        }

        elTarget.classList.add('img-upload-target');

        return elTarget;
    }

    function uploadThumb(e) {
        preventDefaults(e);

        var files;
        var mimeType = /image.*/;

        if (e.target.files) {
            files = e.target.files;
        } else {
            files = e.dataTransfer.files;
        }

        if (files == null || files == undefined) {
            return;
        }

        for (var i = 0 ; i < files.length ; i =+ 1) {
            var file = files[0];

            if (!file.type.match(mimeType)) {
                return;
            }

            var reader = new FileReader();

            if (reader) {
                reader.onloadend = createImgThumbnail;
                reader.readAsDataURL(file);
            }
        }
    }

    function createImgThumbnail(e) {
        var canvas = document.createElement('canvas');
        var existingThumb = elTarget.getElementsByClassName(thumbClass)[0];
        var img = new Image();
        var context;
        var dataURL;

        img.src = e.target.result;
        img.onload = function() {
            canvas.id = 'canvas';
            canvas.width = thumbSize.width;
            canvas.height = thumbSize.height;
            context = canvas.getContext("2d");
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
            dataURL = canvas.toDataURL();

            if (dataURL != null && dataURL != undefined) {
                var nImg = document.createElement('img');
                nImg.src = dataURL;
                nImg.classList.add(thumbClass);

            }

            if (!multipleThumbs && existingThumb) {
                deleteThumb(existingThumb);
            }

            elTarget.appendChild(nImg);
        }
    }

    function createInputFile() {
        inputFile = document.body.querySelector('input[type=file]');

        if (!inputFile) {
            inputFile = document.createElement('input');
            inputFile.setAttribute('type', 'file');
            document.body.appendChild(inputFile);
        }

        inputFile.classList.add('hidden-file-loader');

        return inputFile;
    }

    function openFileDialog() {
        var event = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });
        inputFile.dispatchEvent(event);
    }

    function getThumbSize() {
        thumbSize.width = getTargetSize(elTarget, 'width');
        thumbSize.height = getTargetSize(elTarget, 'height');

        return thumbSize;
    }

    function dragEnter(e) {
        preventDefaults(e);
    }

    function dragExit(e) {
        preventDefaults(e);
    }

    function dragOver(e) {
        preventDefaults(e);
    }

    function deleteThumb(el) {
        el.parentNode.removeChild(el);
    }

    function getTargetSize(el, prop) {
        var pt, pb, pr, pl;
        var style = window.getComputedStyle(el, null);
        var val = parseFloat(style.getPropertyValue(prop));

        pt = parseFloat(style.getPropertyValue('padding-top'));
        pb = parseFloat(style.getPropertyValue('padding-bottom'));
        pr = parseFloat(style.getPropertyValue('padding-right'));
        pl = parseFloat(style.getPropertyValue('padding-left'));

        if (prop = 'width') {
            val -= pr + pl;
        } else if (prop = 'height') {
            val -= pt + pb;
        } else {
            return;
        }

        return val;
    }

    function preventDefaults(e) {
        e.stopPropagation();
        e.preventDefault();
    }
}