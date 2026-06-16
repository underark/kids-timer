import { Timer } from "../timer/timer.js";
import { newLayoutManager, type Layout } from "../layouts/layouts.js";

type ActiveTimer =
    | { running: true; value: Timer }
    | { running: false; value: null }

interface Task {
    name: string;
    image: string;
}

interface LayoutManager {
    getLayout(name: Layout): HTMLDivElement | undefined;
}


class App {
    tasks: Task[];
    timer: ActiveTimer;
    lastTimestamp: number;
    layoutManager: LayoutManager;

    // This constructor is to be used in conjunction with the static method 'create'
    constructor() {
        this.tasks = createTasks();
        this.timer = { running: false, value: null };
        this.lastTimestamp = 0;
        this.layoutManager = newLayoutManager(this.tasks);
    }

    i_changeLayout(name: Layout) {
        const body = document.querySelector("body");
        const layout = this.layoutManager.getLayout(name);
        i_clearBody(body!);
        body?.append(layout!);
    }

    i_startTimer(end: string) {
        this._i_createTimer(end);
        const loop = this._createLoop();
        requestAnimationFrame(loop);
    }

    _i_createTimer(end: string) {
        const timer = new Timer(new Date(), end);
        this.timer = { running: true, value: timer };
    }

    // There is technically a bug here where the last scheduled animation loop will execute without being cancelled
    i_cancelTimer() {
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

function createTasks(): Array<Task> {
    return [
        { name: "brush teeth", image: "" },
    ]
}

function i_clearBody(body: HTMLBodyElement) {
    while (body.hasChildNodes()) {
        body.removeChild(body.lastChild!);
    }
}

export { App };
export type { Task };
