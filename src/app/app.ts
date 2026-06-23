import { newLayoutManager, type Layout } from "../layouts/layouts.js";
import { TimerBackend } from "../backend/backend.js";
import { Render, type AppState } from "../render/render.js";

type Task = { name: string; image: string };
type Message =
    | "start_timer"

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

    // This constructor is to be used in conjunction with the static method 'create'
    constructor() {
        this.tasks = createTasks();
        this.layouts = newLayoutManager(this._execute.bind(this), this.tasks);
        this.backend = new TimerBackend();
        this.render = new Render(this.layouts.getLayouts());
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
