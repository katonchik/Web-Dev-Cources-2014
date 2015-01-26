var Dropzone = function(targetElement, userConfig) {
    var inputFileElement;
    var thumbSize = {};
    var thumbClass = 'img-upload-thumb';
    var multipleThumbs = false;

    this.initializeTargetElement = function() {
        createInputFileElement();
        getThumbSize();
        if (targetElement) {
            targetElement.classList.add('img-upload-target');
            targetElement.addEventListener('click', openFileDialog, false);
            targetElement.addEventListener('dragenter', dragEnter, false);
            targetElement.addEventListener('dragexit', dragExit, false);
            targetElement.addEventListener('dragover', dragOver, false);
            targetElement.addEventListener('drop', uploadThumb, false);
        }
        inputFileElement.addEventListener('change', uploadThumb, false);

    };


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
        var existingThumb = targetElement.getElementsByClassName(thumbClass)[0];
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

            targetElement.appendChild(nImg);
        }
    }

    function createInputFileElement() {
        inputFileElement = document.createElement('input');
        inputFileElement.setAttribute('type', 'file');
        document.body.appendChild(inputFileElement);
        inputFileElement.classList.add('hidden-file-loader');

        return inputFileElement;
    }

    function openFileDialog() {
        var event = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });
        inputFileElement.dispatchEvent(event);
    }

    function getThumbSize() {
        thumbSize.width = getTargetSize(targetElement, 'width');
        thumbSize.height = getTargetSize(targetElement, 'height');

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

        if (prop == 'width') {
            val -= pr + pl;
        } else if (prop == 'height') {
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

    this.initializeTargetElement();

};