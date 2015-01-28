function Calendar(lang){
    function monthNames (month){
        var months = new Array(12);
        if (lang === "ua"){
            months = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
        } else if (lang === "ru"){
            months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентабрь", "Октябрь", "Ноябрь", "Декабрь"];
        } else {
            months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        }
        return months[month];
    }

     function weekDays (){
        var days = new Array(7);
        if (lang === "ua"){
            days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
        } else if (lang === "ru"){
            days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
        } else {
            days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
        }
    }

    function create(){
        var table = document.createElement("table");
        table.className = "calendar";
    }
}

