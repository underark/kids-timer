document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const time = data.get("time");
        const customDateTime = getDateFromTime(new Date(), time);
        console.log(customDateTime);
    });
});

// getDateFromTime expects a string in the format HH:MM, as is returned from a time form input
// getDateFromTime expects a Date object using a Date constructor
// getDateFromTime returns a Date object
function getDateFromTime(date, time) {
    // getMonth returns a 0 indexed month (0 for January) but the parser expects a 1-12 range
    // the Date parser expects a leading 0 before all single digits
    const month = (date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const day = (date.getDate() < 10) ? `0${date.getDate()}` : `${date.getDate()}`;
    const dateTimeString = `${date.getFullYear()}-${month}-${day}T${time}:00`;
    console.log(`Date time format string is ${dateTimeString}`);
    return new Date(dateTimeString);
}
