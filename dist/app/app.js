import { newLayoutManager } from "../layouts/layouts.js";
import { TimerBackend } from "../backend/backend.js";
import { Render } from "../render/render.js";
class App {
    // TODO: Consider moving this to a function factory to avoid using bind()
    constructor() {
        this.tasks = createTasks();
        this.layouts = newLayoutManager(this.execute.bind(this), this.tasks);
        this.render = new Render(this.layouts.getLayouts());
        this.backend = new TimerBackend();
        this.lastTimestamp = 0;
    }
    execute(message) {
        this.backend.update(message);
        const state = this.backend.getState();
        this.render.renderLayout(state);
        this._dispatch(state);
    }
    _dispatch(state) {
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
    _loop(timestamp) {
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
    _diffLastTimestamp(timestamp) {
        return timestamp - this.lastTimestamp;
    }
}
function createTasks() {
    return [
        { name: "brush teeth", image: "" },
    ];
}
export { App };
//# sourceMappingURL=app.js.map