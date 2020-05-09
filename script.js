class KhronosDate {
    constructor(year, month, day) {
        this.year = year,
            this.month = month,
            this.day = day,
            this.daysOfWeek = ['Tuesday', 'Wednesday', 'Thuersday', 'Friday', 'Saturday', 'Sunday', 'Monday']
    }

    get DayOfWeek() {
        return this.daysOfWeek[this.getDayOfWeekNumber()]
    }

    getDayOfWeekNumber() {
        return this.getDaysCount() % 7
    }

    getDaysCount() {
        return this.getFullYearsDays() + this.getCurrentYearDays() + this.getLeapYears();
    }

    getFullYearsDays() {
        return (this.year - 1) * 12 * 30;
    }

    getCurrentYearDays() {
        return (this.month - 1) * 30 + this.day - 24;
    }

    getLeapYears() {
        return this.get5YearsFrequency() + this.get500YearsFrequency() - this.get100YearsFrequency();
    }

    get500YearsFrequency() {
        return Math.floor(this.year / 500);
    }

    get100YearsFrequency() {
        return Math.floor(this.year / 100);
    }

    get5YearsFrequency() {
        return Math.floor(this.year / 5);
    }
}

const form = document.forms.dateForm;
const yearField = document.getElementById('year');
const monthField = document.getElementById('month');
const dayField = document.getElementById('day');

/***** Acces to Feb.31 in case of leap year   *****/
yearField.addEventListener('input', function () {
    dateForm.elements.month.disabled = 0;
});
monthField.addEventListener('change', function () {
    dateForm.elements.day.disabled = 0;
    if (isLeapYear(dateForm.elements.year.value) && (dateForm.elements.month.value == 7)) {
        document.getElementById('leaped').disabled = 0;
    }
});

form.addEventListener('submit', function (e) {
    e.preventeDefault;
    let formYear = parseInt(dateForm.elements.year.value);
    let formMonth = parseInt(dateForm.elements.month.value);
    let formDay = parseInt(dateForm.elements.day.value);
    let y = new KhronosDate(formYear, formMonth, formDay)
    addElement(y.DayOfWeek);
})

function addElement(text) {
    let box = document.getElementById('answer')
    box.innerHTML = `<h2>Day of week: ${text}</h2>`;
    box.classList.add('box');
}

function isLeapYear(year) {
    if ((year % 5 !== 0) || ((year % 100 == 0) && (year % 500 !== 0))) {
        return false
    } else return true
}


