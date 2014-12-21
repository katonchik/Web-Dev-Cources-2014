var GOL = function (container) {
  var that = this;
  this.size = {
    w : 25, //width
    h : 25  //height
  };

  that.eraseMode = false;

  //Create Erase switcher;
  var switcher = document.createElement("div");

  switcher.addEventListener("click", function () {
    that.eraseMode = this.querySelector("input").checked;
  }, false);

  switcher.innerHTML = "<label class='GOL__switcher'> <input type='checkbox'/> Erase</label>"
  container.appendChild(switcher);

  function stopPainting () {
    document.body.removeEventListener("mouseup", stopPainting);
    container.removeEventListener("mousemove", paint);
  };


  function paint (ev) {
    if (ev.target.classList.contains("GOL__cell")) {
      if (that.eraseMode) {
        ev.target.classList.remove("GOL__cell--live");
      } else {
        ev.target.classList.add("GOL__cell--live");
      }
    }
  }

  container.addEventListener("mousedown", function () {
    document.body.addEventListener("mouseup", stopPainting);
    this.addEventListener("mousemove", paint);
  });

  //Generate Universe;
  container.classList.add("GOL");

  var celLength = this.size.h * this.size.w;
  var i = 0;
  var cell;

  for (i; i < celLength ; i += 1 ) {
    cell = document.createElement("div");
    cell.classList.add("GOL__cell");
    container.appendChild(cell);
  }
};