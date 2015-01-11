function dragEnter(e) {
    e.stopPropagation();
    e.preventDefault();
}

function dragExit(e) {
    e.stopPropagation();
    e.preventDefault();
}

function dragOver(e) {
    e.stopPropagation();
    e.preventDefault();
}

function drop(e) {
    e.stopPropagation();
    e.preventDefault();

    var files = e.dataTransfer.files;
    var count = files.length;

    if (count > 0)
        handleFiles(files);
}


function handleFiles(files) {
    var file = files[0];

    document.getElementById("droplabel").innerHTML = "Processing: " + file.name;

    var reader = new FileReader();

    reader.onprogress = handleReaderProgress;
    reader.onloadend = handleReaderLoadEnd;

    reader.readAsDataURL(file);
}

function handleReaderProgress(e) {
    if (e.lengthComputable) {
        var loaded = (e.loaded / e.total);

        var progressBar = document.getElementById('progressbar');
        progressBar.style.width = loaded * 100 + '%';
    }
}

function handleReaderLoadEnd(e) {
    var img = document.getElementById("preview");
    img.src = e.target.result;

    document.getElementById('previewText').style.display = 'none';
}