document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form?.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const time = data.get("time")?.toString();
        const timerEnd = getDateFromTime(new Date(), time!);
        const duration = getTimeDiff(new Date(), timerEnd);
        console.log(duration);
    });
});

// getDateFromTime expects a string in the format HH:MM, as is returned from a time form input
// getDateFromTime expects a Date object using a Date constructor
// getDateFromTime returns a Date object
function getDateFromTime(date: Date, time: string): Date {
    // getMonth returns a 0 indexed month (0 for January) but the parser expects a 1-12 range
    // the Date parser expects a leading 0 before all single digits
    const month = (date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const day = (date.getDate() < 10) ? `0${date.getDate()}` : `${date.getDate()}`;
    const dateTimeString = `${date.getFullYear()}-${month}-${day}T${time}:00`;
    return new Date(dateTimeString);
}

// getTimeDiff expects two Date objects, the start time and the end time of the timer
function getTimeDiff(start: Date, end: Date): number {
    const startMillis = start.valueOf();
    const endMillis = end.valueOf();
    return endMillis - startMillis;
}
