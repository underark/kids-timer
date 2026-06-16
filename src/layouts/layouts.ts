import type { Task } from "../app/app.js"
import { newBehaviorManager } from "../behavior/behavior.js";
import { createInput, createTaskCard } from "./helpers.js";

type Layout =
    | "main"
    | "timer"

const newLayoutManager = (tasks: Task[]) => {
    const cards = tasks.map((t) => createTaskCard(t));
    const behavior = newBehaviorManager();

    const createMainForm = () => {
        const form = document.createElement("form");
        form.method = "get";
        form.action = "";
        behavior.initForm(form, timer());
        const time = createInput("time", "time", "time");
        const submit = createInput("submit", "submit", "submit");
        form.append(time, submit);
        return form;
    };

    const main = () => {
        const div = document.createElement("div");
        const form = createMainForm();
        div.append(form, ...cards);
        return div;
    };

    const timer = () => {
        const div = document.createElement("div");
        const progress = document.createElement("div");
        progress.id = "progress";
        div.append(progress);
        return div;
    };

    const getMain = () => {
        return main();
    };

    return {
        getMain,
    };
}

export { newLayoutManager };
export type { Layout };
