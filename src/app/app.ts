import { Timer } from "../timer/timer.js";

type ActiveTimer =
    | { running: true; value: Timer }
    | { running: false; value: null }

type View =
    | "main"
    | "timer"

class App {
    timer: ActiveTimer;
    lastTimestamp: number;
    currentView: View;

    constructor() {
        this.timer = { running: false, value: null };
        this.lastTimestamp = 0;
        this.currentView = "main";
    }

    i_startTimer(end: string) {
        this._i_createTimer(end);
        const loop = this._createLoop();
        requestAnimationFrame(loop);
    }

    // There is technically a bug here where the last scheduled animation loop will execute without being cancelled
    i_cancelTimer() {
        this.timer = { running: false, value: null };
        this.lastTimestamp = 0;
    }

    _diffLastTimestamp(timestamp: DOMHighResTimeStamp) {
        return timestamp - this.lastTimestamp;
    }

    _i_createTimer(end: string) {
        const timer = new Timer(new Date(), end);
        this.timer = { running: true, value: timer };
    }

    _createLoop() {
        const i_loop = (timestamp: number) => {
            if (this.timer.running === true && this._diffLastTimestamp(timestamp) >= 16) {
                const div = document.querySelector("#progress");
                const elapsed = this.timer.value.calculateElapsed();
                div!.textContent = elapsed.toString();
                if (elapsed >= 100) {
                    this.i_cancelTimer();
                    return;
                }
                this.lastTimestamp = timestamp;
            }
            requestAnimationFrame(i_loop);
        };
        return i_loop;
    }
}

export { App };
