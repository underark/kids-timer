import { newLayoutManager, type Layout } from "../layouts/layouts.js";
import { TimerBackend } from "../backend/backend.js";
import { Render, type AppState } from "../render/render.js";

type Task = { name: string; image: string };

// TODO: consider giving these named types
type Message =
    | { msg: "start_timer", end: string }
    | { msg: "end_timer" }

interface LayoutManager {
    getLayouts(): Map<Layout, HTMLDivElement>;
}

interface Backend {
    update(message: Message, end?: string): void;
    getState(): AppState;
}

interface Renderer {
    renderLayout(state: AppState): void;
    renderProgress(progress: number): void;
}

class App {
    tasks: Task[];
    layouts: LayoutManager;
    backend: Backend;
    render: Renderer;
    lastTimestamp: number;

    // TODO: Consider moving this to a function factory to avoid using bind()
    constructor() {
        this.tasks = createTasks();
        this.layouts = newLayoutManager(this.execute.bind(this), this.tasks);
        this.render = new Render(this.layouts.getLayouts());
        this.backend = new TimerBackend();
        this.lastTimestamp = 0;
    }

    execute(message: Message) {
        this.backend.update(message);
        const state = this.backend.getState();
        this.render.renderLayout(state);
        this._dispatch(state);
    }

    _dispatch(state: AppState) {
        switch (state.state) {
            case "timer":
                requestAnimationFrame(this._loop);
                return;
        }
    }

    start() {
        const state = this.backend.getState();
        this.render.renderLayout(state);
    }

    _loop(timestamp: DOMHighResTimeStamp) {
        const state = this.backend.getState();
        if (state.state === "timer" && this._diffLastTimestamp(timestamp) >= 16) {
            if (state.progress >= 100) {
                this.backend.update({ msg: "end_timer" });
                return;
            }
            this.render.renderProgress(state.progress);
            this.lastTimestamp = timestamp;
            requestAnimationFrame(this._loop);
        }
    }

    _diffLastTimestamp(timestamp: DOMHighResTimeStamp) {
        return timestamp - this.lastTimestamp;
    }
}

function createTasks(): Array<Task> {
    return [
        { name: "brush teeth", image: "" },
    ]
}

export { App };
export type { Task, Message };
