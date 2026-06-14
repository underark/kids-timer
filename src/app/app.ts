import { Timer } from "../timer/timer.js";

type ActiveTimer =
    | { running: true; timer: Timer }
    | { running: false; timer: null }

class App {
    timer: ActiveTimer;

    constructor() {
        this.timer = { running: false, timer: null };
    }

    i_startTimer(end: string) {
        const timer = new Timer(new Date(), end);
        this.timer = { running: true, timer: timer };
        const i_render = (timestamp: number) => {
            const sinceLast = Date.now() - timestamp;
            if (this.timer.running === true && sinceLast >= 16) {
                const div = document.querySelector("#progress");
                const elapsed = this.timer.timer.calculateElapsed();
                div!.textContent = elapsed.toString();
                if (elapsed >= 100) {
                    this.timer = { running: false, timer: null };
                    return;
                }
            }
            requestAnimationFrame(i_render);
        };
        requestAnimationFrame(i_render);
    }
}

export { App };
