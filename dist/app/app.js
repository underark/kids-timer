import { newLayoutManager } from "../layouts/layouts.js";
import { TimerBackend } from "../backend/backend.js";
import { Render } from "../render/render.js";
class App {
    // TODO: Consider moving this to a function factory to avoid using bind()
    constructor() {
        this.tasks = createTasks();
        this.layouts = newLayoutManager(this._execute.bind(this), this.tasks);
        this.render = new Render(this.layouts.getLayouts());
        this.backend = new TimerBackend();
    }
    _execute(message, end) {
        if (end !== undefined) {
            this.backend.dispatch(message, end);
        }
        else {
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
function createTasks() {
    return [
        { name: "brush teeth", image: "" },
    ];
}
export { App };
//# sourceMappingURL=app.js.map