import type { Message } from "../app/app.js";
import type { Layout } from "../layouts/layouts.js";
import type { AppState } from "../render/render.js";
import { Timer } from "../timer/timer.js";

type ActiveTimer =
    | { running: true; value: Timer }
    | { running: false; value: null }

class TimerBackend {
    timer: ActiveTimer;
    lastTimestamp: number;
    state: Layout;

    constructor() {
        this.timer = { running: false, value: null };
        this.lastTimestamp = 0;
        this.state = "main";
    }

    dispatch(message: Message) {
        switch (message.msg) {
            case "start_timer":
                this._startTimer(message.end);
                this.state = "timer";
                return;
        }
    }

    getState(): AppState {
        return {
            state: this.state,
        }
    }

    _startTimer(end: string) {
        this._createTimer(end);
        const loop = this._createLoop();
        requestAnimationFrame(loop);
    }

    _createTimer(end: string) {
        const t = new Timer(new Date(), end);
        this.timer = { running: true, value: t };
    }

    // There is technically a bug here where the last scheduled animation loop will execute without being cancelled
    _cancelTimer() {
        this.timer = { running: false, value: null };
        this.lastTimestamp = 0;
    }

    _diffLastTimestamp(timestamp: DOMHighResTimeStamp) {
        return timestamp - this.lastTimestamp;
    }

    _createLoop() {
        const i_loop = (timestamp: number) => {
            if (this.timer.running === true && this._diffLastTimestamp(timestamp) >= 16) {
                const div = document.querySelector("#progress");
                const elapsed = this.timer.value.calculateElapsed();
                div!.textContent = elapsed.toString();
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

