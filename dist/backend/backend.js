import { Timer } from "../timer/timer.js";
class TimerBackend {
    constructor() {
        this.timer = { running: false, value: null };
        this.lastTimestamp = 0;
        this.state = "main";
    }
    dispatch(message) {
        switch (message.msg) {
            case "start_timer":
                this._startTimer(message.end);
                this.state = "timer";
                return;
        }
    }
    getState() {
        return {
            state: this.state,
        };
    }
    _startTimer(end) {
        this._createTimer(end);
        const loop = this._createLoop();
        requestAnimationFrame(loop);
    }
    _createTimer(end) {
        const t = new Timer(new Date(), end);
        this.timer = { running: true, value: t };
    }
    // There is technically a bug here where the last scheduled animation loop will execute without being cancelled
    _cancelTimer() {
        this.timer = { running: false, value: null };
        this.lastTimestamp = 0;
    }
    _diffLastTimestamp(timestamp) {
        return timestamp - this.lastTimestamp;
    }
    _createLoop() {
        const i_loop = (timestamp) => {
            if (this.timer.running === true && this._diffLastTimestamp(timestamp) >= 16) {
                const div = document.querySelector("#progress");
                const elapsed = this.timer.value.calculateElapsed();
                div.textContent = elapsed.toString();
                if (elapsed >= 100) {
                    this._cancelTimer();
                    return;
                }
                this.lastTimestamp = timestamp;
            }
            requestAnimationFrame(i_loop);
        };
        return i_loop;
    }
}
export { TimerBackend };
//# sourceMappingURL=backend.js.map