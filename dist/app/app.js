import { newLayoutManager } from "../layouts/layouts.js";
class App {
    // This constructor is to be used in conjunction with the static method 'create'
    constructor() {
        this.tasks = createTasks();
        this.layoutManager = newLayoutManager(this.tasks);
    }
    i_start() {
        const main = this.layoutManager.getMain();
        const body = document.querySelector("body");
        body?.append(main);
    }
}
function createTasks() {
    return [
        { name: "brush teeth", image: "" },
    ];
}
export { App };
//# sourceMappingURL=app.js.map