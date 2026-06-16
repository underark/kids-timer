import { newLayoutManager } from "../layouts/layouts.js";

interface Task {
    name: string;
    image: string;
}

interface LayoutManager {
    getMain(): HTMLDivElement | undefined;
}


class App {
    tasks: Task[];
    layoutManager: LayoutManager;

    // This constructor is to be used in conjunction with the static method 'create'
    constructor() {
        this.tasks = createTasks();
        this.layoutManager = newLayoutManager(this.tasks);
    }

    i_start() {
        const main = this.layoutManager.getMain()
        const body = document.querySelector("body");
        body?.append(main!);
    }
}

function createTasks(): Array<Task> {
    return [
        { name: "brush teeth", image: "" },
    ]
}

export { App };
export type { Task };
