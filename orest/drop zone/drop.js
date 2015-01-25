(function() {
    var dropZone = document.getElementById('dropZone');

    function uploadFiles(files) {
        var formData = new FormData(),
            xhr = new XMLHttpRequest(),
            i;

        for (i = 0; i < files.length; i++) {
            formData.append('file[]', files[i] );
        }

        xhr.onload = function(){
            var response = this.responseText;
        }

        xhr.open('POST', 'upload.php'/* 'backend_goes_here'  */);
        xhr.send(formData);

    }

    function displayUploads(data) {
        var uploads = document.getElementById('uploads'),
            anchor;

        for (var i = 0; i < data.length; i++) {
            anchor = document.createElement('a');
            anchor.href = data[i].file;
            anchor.innerHTML = data[i].name + '<br/>';

            uploads.appendChild(anchor);
        }

    }

    dropZone.ondragover = function() {
        this.classList.add('dropZoneHovered');
        return false;
    }

    dropZone.ondragleave = function() {
        this.classList.remove('dropZoneHovered');
        return false;
    }
    dropZone.ondrop = function(event) {
        this.classList.remove('dropZoneHovered');
        event.preventDefault();
        uploadFiles(event.dataTransfer.files);
    }

}
) ();
