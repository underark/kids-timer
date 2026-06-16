type Duration = number;

class Timer {
    start: Date;
    duration: Duration;

    // TODO: Include some defensive checks against past times and 0-length durations
    constructor(date: Date, time: string) {
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
function getDateFromTime(date: Date, time: string): Date {
    // Cloning to return a new Date object without mutating the original
    const cloned = new Date(date.valueOf());
    const timeParts: string[] = time.split(":");
    cloned.setHours(parseInt(timeParts[0]!), parseInt(timeParts[1]!));
    return cloned;
}

// getTimeDiff expects two Date objects, the start time and the end time of the timer
function getTimeDiff(start: Date, end: Date): number {
    const startMillis = start.valueOf();
    const endMillis = end.valueOf();
    return endMillis - startMillis;
}

export { Timer };
