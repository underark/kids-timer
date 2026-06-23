import { Timer } from "../timer/timer.js";
class TimerBackend {
    constructor() {
        this.timer = { running: false, value: null };
        this.state = "main";
    }
    update(message) {
        switch (message.msg) {
            case "start_timer":
                this._startTimer(message.end);
                return;
            case "end_timer":
                if (this.state == "timer") {
                    this._cancelTimer();
                }
                return;
        }
    }
    getState() {
        return {
            state: this.state,
            // TODO: Consider moving this to a discriminated union to get undefined safety on  progress field
            progress: this.timer.value?.calculateElapsed(),
        };
    }
    _startTimer(end) {
        const t = new Timer(new Date(), end);
        this.timer = { running: true, value: t };
        this.state = "timer";
    }
    // There is technically a bug here where the last scheduled animation loop will execute without being cancelled
    _cancelTimer() {
        this.timer = { running: false, value: null };
        this.state = "main";
    }
}
export { TimerBackend };
//# sourceMappingURL=backend.js.map