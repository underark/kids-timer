import { newLayoutManager, type Layout } from "../layouts/layouts.js";
import { TimerBackend } from "../backend/backend.js";
import { Render, type AppState } from "../render/render.js";

type Task = { name: string; image: string };
type Message =
    | { msg: "start_timer", end: string }
    | { msg: "end_timer" }

interface LayoutManager {
    getLayouts(): Map<Layout, HTMLDivElement>;
}

interface Backend {
    dispatch(message: Message, end?: string): void;
    getState(): AppState;
}

interface Renderer {
    render(state: AppState): void;
}

class App {
    tasks: Task[];
    layouts: LayoutManager;
    backend: Backend;
    render: Renderer;

    // TODO: Consider moving this to a function factory to avoid using bind()
    constructor() {
        this.tasks = createTasks();
        this.layouts = newLayoutManager(this._execute.bind(this), this.tasks);
        this.render = new Render(this.layouts.getLayouts());
        this.backend = new TimerBackend();
    }

    _execute(message: Message): void;
    _execute(message: Message, end: string): void;
    _execute(message: Message, end?: string) {
        if (end !== undefined) {
            this.backend.dispatch(message, end);
        } else {
            this.backend.dispatch(message);
        }
        const state = this.backend.getState();
        this.render.render(state);
    }

    start() {
        const state = this.backend.getState();
        this.render.render(state);
    }
}

function createTasks(): Array<Task> {
    return [
        { name: "brush teeth", image: "" },
    ]
}

export { App };
export type { Task, Message };
