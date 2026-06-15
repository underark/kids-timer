import { Timer } from "../timer/timer.js";
class App {
    constructor() {
        this.timer = { running: false, value: null };
        this.lastTimestamp = 0;
    }
    i_startTimer(end) {
        const timer = new Timer(new Date(), end);
        this.timer = { running: true, value: timer };
        const i_render = (timestamp) => {
            if (this.timer.running === true && this.diffLastTimestamp(timestamp) >= 16) {
                const div = document.querySelector("#progress");
                const elapsed = this.timer.value.calculateElapsed();
                div.textContent = elapsed.toString();
                if (elapsed >= 100) {
                    this.i_cancelTimer();
                    return;
                }
                this.lastTimestamp = timestamp;
            }
            requestAnimationFrame(i_render);
        };
        requestAnimationFrame(i_render);
    }
    i_cancelTimer() {
        this.timer = { running: false, value: null };
        this.lastTimestamp = 0;
    }
    diffLastTimestamp(timestamp) {
        return timestamp - this.lastTimestamp;
    }
}
export { App };
//# sourceMappingURL=app.js.map