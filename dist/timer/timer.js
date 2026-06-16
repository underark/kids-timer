class Timer {
    // TODO: Include some defensive checks against past times and 0-length durations
    constructor(date, time) {
        const end = getDateFromTime(date, time);
        const duration = getTimeDiff(date, end);
        this.start = date;
        this.duration = duration;
    }
    // returns % progress of the timer
    calculateElapsed() {
        const diff = getTimeDiff(this.start, new Date());
        return (diff / this.duration) * 100;
    }
}
// getDateFromTime expects a Date object with the desired date
function getDateFromTime(date, time) {
    // Cloning to return a new Date object without mutating the original
    const cloned = new Date(date.valueOf());
    const timeParts = time.split(":");
    cloned.setHours(parseInt(timeParts[0]), parseInt(timeParts[1]));
    return cloned;
}
// getTimeDiff expects two Date objects, the start time and the end time of the timer
function getTimeDiff(start, end) {
    const startMillis = start.valueOf();
    const endMillis = end.valueOf();
    return endMillis - startMillis;
}
export { Timer };
//# sourceMappingURL=timer.js.map