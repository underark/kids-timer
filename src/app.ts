document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form?.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const time = data.get("time")?.toString();
        const timerEnd = getDateFromTime(new Date(), time!);
        console.log(timerEnd);
        const duration = getTimeDiff(new Date(), timerEnd);
        console.log(duration);
    });
});

function getDateFromTime(date: Date, time: string): Date {
    const dateClone = new Date(date.valueOf());
    const timeParts: string[] = time.split(":");
    dateClone.setHours(parseInt(timeParts[0]!), parseInt(timeParts[1]!));
    return dateClone;
}

// getTimeDiff expects two Date objects, the start time and the end time of the timer
function getTimeDiff(start: Date, end: Date): number {
    const startMillis = start.valueOf();
    const endMillis = end.valueOf();
    return endMillis - startMillis;
}
