var daysNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

var Calendar = function () {
    var this_ = this;
    this_.month;
    this_.year;
    this_.day;
    var date= new Date();
    var calendarContainer;
    
    /**
     * set calendar date 
     * @param Year
     * @param Month
     * @param Day
     */
    this.setDate = function (Year, Month,Day) {
        this_.year = Year || this_.year || new Date().getFullYear();
        this_.month = Month || this_.month || new Date().getMonth() + 1;
        this_.day =Day || this_.day || new Date().getDate();

    };
    /**
     * return first month day
     * @returns {number}
     */
    function getDay() {
        return new Date(this_.year, this_.month - 1, 1).getDay();
    }

    /**
     * return number of days in defined month
     * @param year
     * @param month
     * @returns {number}
     */
    this.daysInMonth = function (year, month) {
        return new Date(year || this_.year, month || this_.month, 0).getDate();
    };

    /**
     * if switcher is true month++ else month--
     * @param switcher
     * @returns {number}
     */
    this.changeMonth = function (switcher) {
        if (switcher) {
            this_.month++;
        } else {
            this_.month--;
        }
        if (this_.month >= 12) {
            this_.year++;
            this_.month = 1;
        }
        else if (this_.month <= 0) {
            this_.year--;
            this_.month = 12;
        }
        return this.daysInMonth(this_.year, this_.month);
    };

    /**
     * draw calendar header
     * @returns {HTMLElement}
     */
    this.drawHeader = function () {
        var headerContainer = document.createElement("div");
        headerContainer.classList.add("header");

        var next = [">", "next", nextMonth];
        var previous = ["<", "previous", previousMonth];
        function drawMonthScroll(parameter) {
            var button = document.createElement("button");
            button.innerHTML = parameter[0];
            button.classList.add("button", "button--" + parameter[1])
            headerContainer.appendChild(button)
            button.addEventListener("click", parameter[2])
        }

        var inn = ["inn"];
        var out = ["output"];
        // draw calendar title
        function drawTitle(parameter) {
            var input = document.createElement("input");
            input.classList.add("input")
            headerContainer.appendChild(input)
            if (parameter[0] == 'output') {
                input.setAttribute('disabled', false);
                input.classList.add(parameter[0])
            } else {
                input.addEventListener("keyup", function (event) {
                    set(event, input)
                });
            }
        }

        function nextMonth() {
            this_.changeMonth(true)
            this_.update();
        }

        function previousMonth() {
            this_.changeMonth(false)
            this_.update();
        }

        /**
         * set the calendar date from input element
         * @param el
         * @param element
         */
        function set(el, element) {
            if (el.keyCode === 13) {
                var a = element.value.split(".");
                console.log(a);
                var b = a.map(function (el) {
                    return parseInt(el)
                });
                this_.setDate(b[2], b[1],b[0]);
                this_.update();
            }
        }

        function init() {
            drawMonthScroll(previous);drawMonthScroll(next)
            drawTitle(out);
            drawTitle(inn);

        }

        init();
        return headerContainer;
    }
    /**
     * draw calendar body
     */
    this.drawCalendar = function () {
        calendarContainer = document.createElement("div");
        calendarContainer.classList.add("calendar_container");
        calendarContainer.appendChild(this.drawHeader());
        var day_of_week;

        function drawWeekDays() {
            var weakDays = document.createElement("div");
            weakDays.classList.add("days_container");
            daysNames.forEach(function (el) {
                var dayOfWeak = document.createElement("div");
                dayOfWeak.classList.add("weak");
                dayOfWeak.innerHTML = el;
                weakDays.appendChild(dayOfWeak);
            })
            calendarContainer.appendChild(weakDays);
        }

        function drawDaysTable() {
            var daysContainer = document.createElement("div");
            daysContainer.classList.add("days_container");
            //add event that show selected day
            daysContainer.addEventListener('click',function(event){
                if(!event.target.classList.contains("day--empty")){
                this_.setDate(this_.year,this_.month,event.target.innerHTML);
                this_.update()}
            })
            //add marked day
            daysContainer.addEventListener('dblclick',function(event){
                if(!event.target.classList.contains("day--empty")){
                    event.target.classList.toggle("day--event")}
            },true)
            for (var i = 1; i <= 42; i++) {
                var days = document.createElement("div");
                days.classList.add("day")
                daysContainer.appendChild(days);
            }
            calendarContainer.appendChild(daysContainer)
        };

        document.body.appendChild(calendarContainer);
        drawWeekDays();
        drawDaysTable();
    };
    /**
     * clear calendar days
     */
    function clear() {
        var days = calendarContainer.getElementsByClassName("day") 
        var i;
        for (i = 1; i <= 42; i++) {
            days[i - 1].classList.remove("day--empty","day--current","day--selected");
        }
    }

    /**
     * update calendar
     */
    this.update = function () {
        clear();
        var output = calendarContainer.getElementsByClassName("output")[0];
        output.value=monthNames[this_.month-1]+"  "+this_.year;
        var input= calendarContainer.getElementsByClassName("input")[1];
        input.value=this_.day+"."+this_.month+"."+this_.year;
        var days = calendarContainer.getElementsByClassName("day");
        var firstDay = getDay();
        var count = 1;
        var daysInMonth = this_.daysInMonth();
        var i;

        for (i = 1; i <= 42; i++) {
            if (firstDay < i && count <= daysInMonth) {
                days[i - 1].innerHTML = count++;
                if(this_.day==i-firstDay){
                    days[i-1].classList.add("day--selected")
                }
                if((i-firstDay==date.getDate())&&this_.year ==date.getFullYear() && this_.month==date.getMonth()+1 ){
                    days[i-1].classList.add("day--current")
                }

            } else {
                days[i - 1].classList.add("day--empty");
                if(days[i-1])
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
