import type { Message } from "../app/app.js";
import type { Layout } from "../layouts/layouts.js";
import type { AppState } from "../render/render.js";
import { Timer } from "../timer/timer.js";

type ActiveTimer =
    | { running: true; value: Timer }
    | { running: false; value: null }

class TimerBackend {
    timer: ActiveTimer;
    state: Layout;

    constructor() {
        this.timer = { running: false, value: null };
        this.state = "main";
    }

    update(message: Message) {
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

    getState(): AppState {
        return {
            state: this.state,
            // TODO: Consider moving this to a discriminated union to get undefined safety on  progress field
            progress: this.timer.value?.calculateElapsed()!,
        }
    }

    _startTimer(end: string) {
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

