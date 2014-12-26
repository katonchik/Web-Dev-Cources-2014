/**
 * Created by Katonchik on 26.12.2014.
 */

function Calendar(containerElement)
{
    var container           = containerElement,
        currentMonthStart   = new Date(),
        currentMonth,
        currentYear,
        daysInFeb,
        daysInMonths,
        daysThisMonth,
        monthStartDaySys,
        monthStartDayOfWeek,
        daysBeforeStart;

    /**
     * Initializes month variables; this function is called with every month change.
     */
    function initializeMonth() {
        currentMonth        = currentMonthStart.getMonth();
        currentYear         = currentMonthStart.getFullYear();
        daysInFeb           = (currentYear%4 == 0 && currentYear!=1900 ? 29 : 28);
        daysInMonths        = [31,daysInFeb,31,30,31,30,31,31,30,31,30,31];
        daysThisMonth       = daysInMonths[currentMonth];
        monthStartDaySys    = currentMonthStart.getDay();
        monthStartDayOfWeek = (monthStartDaySys == 0 ? 7 : monthStartDaySys);
        daysBeforeStart     = monthStartDayOfWeek - 1;
    }

    /**
     * Draws month calendar, including the title, scroll controls and the dates grid
     */
    function draw(){
        drawScrollControl('&lt;&lt;', 'goToPrev');
        drawMonthTitle();
        drawScrollControl('&gt;&gt;', 'goToNext');

        var i;
        var calDate = new Date(currentMonthStart.getTime());
        //alert("inside draw" + container);
        for(i=0; i<daysBeforeStart; i++)
        {
            drawCell(null);
        }
        for(i=1; i<daysThisMonth+1; i++)
        {
            calDate.setDate(i);
            drawCell(calDate);
        }
        var remainingEmpty = (Math.floor((daysBeforeStart + daysThisMonth)/7) + 1) * 7 - (daysBeforeStart + daysThisMonth);
        for(i=0; i<remainingEmpty; i++)
        {
            drawCell(null);
        }
    }

    /**
     * Draws scroll control, either 'prev' or 'next'
     * @param label Whatever text shows on the scroll control
     * @param controlID HTML element ID of the scroll control
     */
    function drawScrollControl(label, controlID) {
        var scrollControl = document.createElement('div');
        scrollControl.innerHTML = label;
        scrollControl.classList.add("calendar__scrollControl");
        scrollControl.id = controlID;
        scrollControl.addEventListener("click", changeMonth, false);
        container.appendChild(scrollControl);
    }

    /**
     * Draws calendar title, including the name of the month and the year
     */
    function drawMonthTitle() {
        var locale     = "uk-ua",
            monthName  = currentMonthStart.toLocaleString(locale, { month: "long" }),
            titleDiv   = document.createElement('div');

        titleDiv.innerHTML = monthName + " " + currentYear;
        titleDiv.classList.add('calendar__monthTitle');
        container.appendChild(titleDiv);
    }

    /**
     * Draws individual cells
     * @param calDate Date object
     */
    function drawCell(calDate) {
        var dateCell = document.createElement('div');
        container.appendChild(dateCell);
        dateCell.classList.add("calendar__cell");

        if(calDate === null) {
            dateCell.classList.add('calendar__cell--empty');
            return;
        }

        var dayOfMonth    = calDate.getDate(),
            dayOfMonthStr = '' + dayOfMonth,
            dayOfWeek     = calDate.getDay();
        if(dayOfWeek == 0 || dayOfWeek == 6) {
            dateCell.classList.add('calendar__cell--weekend');
        }
        else{
            dateCell.classList.add('calendar__cell--weekday');
        }
        dateCell.id = dayOfMonthStr;
        dateCell.innerHTML = dayOfMonthStr;
    }

    /**
     * Changes current month. This function is triggered on month scroll.
     */
    function changeMonth(){
        if(this.id == 'goToPrev'){
            currentMonthStart.setMonth(currentMonth - 1 );
        }
        else {
            currentMonthStart.setMonth(currentMonth + 1 );
        }

        initializeMonth();
        refreshCalendar();
    }

    /**
     * Removes old month's HTML elements and draws current month's calendar.
     */
    function refreshCalendar(){
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        draw();
    }

    currentMonthStart.setDate(1);
    initializeMonth();
    draw();

}