var daysNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
var some_varible = 5;
Calendar = function () {
    var date = new Date(),
        day = date.getDay(),
        month ,
        year,
        first_day;
    //
    set_month(0)
    set_year(0)

    //
    this.days_in_month = function (year, month) {
        return new Date(year, month , 0).getDate();
    }
    function calc_first_day(selected_year, selected_month) {


        return new Date(selected_year, selected_month , 0).getDay()+1;
    }

    function set_year(y) {
        year = y || date.getFullYear();
    }

    function set_month(m) {
        month = m || date.getMonth();
    }
    this.get_month=function(){
        return month;
    }
    this.get_year=function(){
        return year;
    }

    this.set_date = function (year, month) {
        set_year(year);
        set_month(month);
    }

    // number_of_days=this.days_in_month();

    var calendar_container = document.createElement("div");
    calendar_container.className = "calendar_container";
    this.render_day_names_column = function () {
        var days_container = document.createElement("div");
        days_container.className = "days_container";
        daysNames.forEach(function (el) {
            var day_of_week = document.createElement("div");
            day_of_week.className = "day_of_week";
            day_of_week.innerHTML = el;
            days_container.appendChild(day_of_week);
        })
        calendar_container.appendChild(days_container);
        document.body.appendChild(calendar_container);
        console.log(month)
    }
    this.render_days_table = function () {
        first_day = calc_first_day(year, month);
        var count = 1;
        var days_in_month = this.days_in_month(year, month);
        for (var i = 1; i <= 42; i++) {
            var days = document.createElement("div");
            if (first_day < i && count <= days_in_month) {
                if (count == date.getDate()) {
                    days.id = "current_day";
                } else {
                    days.className = "day";
                }
                days.innerHTML = count++;

            } else {
                days.className = "empty"
                if (count > days_in_month)
                    days.innerText = i - count - first_day + 1;
                else {
                    if (month === 0) {

                        days.innerText = this.days_in_month(year - 1, 11) + i - first_day;
                    }
                    else {
                        days.innerText = this.days_in_month(year, month - 1) + i - first_day;
                    }


                }
            }
            calendar_container.appendChild(days);
        }
        document.body.appendChild(calendar_container);
    };


}
var c = new Calendar();
function create() {

    c.render_day_names_column()
    c.render_days_table();
}
function set_date(year, month) {

    c.set_date(year, month);

}
function previous_month(){
    var month=c.get_month();
    var year= c.get_year();
    if(month==0)
    {
        month=11;
        year-=1;
    }
    else{
        month-=1;
    }
    set_date(year,month)
}
function previous_month(){
    var month=c.get_month();
    var year= c.get_year();


        month-=1;
    console.log(year,month);
    set_date(year,month)
}
function next_month(){
    var month=c.get_month();
    var year= c.get_year();


        month+=1;
    console.log(year,month);
    set_date(year,month)
}