var daysNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

var Calendar = function () {
    var this_ = this;
    this_.month;
    this_.year;
    var date;
    var day;
    var calendarContainer;

    this.setDate = function (Year, Month) {
        this_.year = Year || this_.year || new Date().getFullYear();
        this_.month = Month || this_.month || new Date().getMonth() + 1;
    };
    function getDate() {
        return new Date(this_.year, this_.month - 1, 1).getDay();
    }

    this.daysInMonth = function (year, month) {
        return new Date(year || this_.year, month || this_.month, 0).getDate();
    };
    this.changeMonth = function (bool) {
        if (bool) {
            this_.month++;
        } else {
            this_.month--;
        }
        return this.daysInMonth(this_.year, this_.month);
    };
    this.drawCalendar = function () {
        var day_of_week;
        calendarContainer = document.createElement("div");
        calendarContainer.classList.add("calendar_container");
        function drawWeekDays() {
            var days_container = document.createElement("div");
            days_container.classList.add("days_container");
            daysNames.forEach(function (el) {
                var day_of_week = document.createElement("div");
                day_of_week.classList.add("day_of_week");
                day_of_week.innerHTML = el;
                days_container.appendChild(day_of_week);
            })
            calendarContainer.appendChild(days_container);
        }

        function renderDaysTable() {


            for (var i = 1; i <= 42; i++) {
                var days = document.createElement("div");
                days.classList.add("day")
                calendarContainer.appendChild(days);
            }


            document.body.appendChild(calendarContainer);
        };


        drawWeekDays();
        renderDaysTable();
    };

    function clear() {
        var days = document.body.getElementsByClassName("day")
        var i;
        for (i = 1; i <= 42; i++) {
            days[i - 1].classList.remove("empty");
        }
    }

    this.update = function () {
        clear();

       var days = document.body.getElementsByClassName("day");
        var firstDay = getDate();
        var count = 1;
        var daysInMonth = this_.daysInMonth();
        var i;
        for (i = 1; i <= 42; i++) {
            if (firstDay < i && count <= daysInMonth) {
                days[i - 1].innerHTML = count++;
            } else {
                days[i - 1].classList.add("empty");
                if (count > daysInMonth)
                    days[i - 1].innerHTML = i - count - firstDay + 1;
                else {
                    days[i - 1].innerHTML = this_.daysInMonth(this_.year, this_.month - 1) + i - firstDay;
                }
            }
        }
    };
};
var c = new Calendar();
function create() {

    c.setDate();
    c.daysInMonth();
    c.drawCalendar();
    c.update();
}
create();
function next() {
    c.changeMonth(true)
    c.update();
}
function previous() {
    c.changeMonth(false)
    c.update();
}