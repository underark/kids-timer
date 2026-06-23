import type { Message, Task } from "../app/app.js"
import { createInput, createTaskCard } from "./helpers.js";

type Layout =
    | "main"
    | "timer"

type DispatchFunction = {
    (message: Message): void;
}

// TODO: Move this to a class?
const newLayoutManager = (dispatch: DispatchFunction, tasks: Task[]) => {
    const cards = tasks.map((t) => createTaskCard(t));

    const createMainForm = () => {
        const form = document.createElement("form");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = new FormData(form);
            const time = data.get("time");
            dispatch({ msg: "start_timer", end: time?.toString()! });
        });
        form.method = "get";
        form.action = "";
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
        const stop = document.createElement("button");
        stop.textContent = "Stop timer";
        stop.addEventListener("click", () => {
            dispatch({ msg: "end_timer" });
        });
        div.append(progress, stop);
        return div;
    };

    const getLayouts = () => {
        return new Map<Layout, HTMLDivElement>([
            ["main", main()],
            ["timer", timer()],
        ])
    }

    return {
        getLayouts,
    };
}

export { newLayoutManager };
export type { Layout, DispatchFunction };
