import type { Task } from "../app/app.js"

type Layout =
    | "main"
    | "timer"

const newLayoutManager = (tasks: Task[]) => {
    const taskList = tasks;

    const main = () => {
        const div = document.createElement("div");
        const form = createMainForm();
        const cards = createCards();
        div.append(form, ...cards);
        return div;
    }

    const timer = () => {
        const div = document.createElement("div");
        const progress = document.createElement("div");
        progress.id = "progress";
        div.append(progress);
        return div;
    }


    const createCards = () => {
        return taskList.map((t) => createTaskCard(t));
    }

    const createTaskCard = (t: Task) => {
        const container = document.createElement("div");
        container.textContent = t.name;
        return container;
    }

    const createMainForm = () => {
        const form = document.createElement("form");
        form.method = "get";
        form.action = "";
        const time = createInput("time", "time", "time");
        const submit = createInput("submit", "submit", "submit");
        form.append(time, submit);
        return form;
    }

    const createInput = (type: string, name: string, id: string) => {
        const input = document.createElement("input");
        input.type = type;
        input.name = name;
        input.id = id;
        return input;
    }

    const layouts = new Map<string, HTMLDivElement>([
        ["main", main()],
        ["timer", timer()],
    ]);

    const getLayout = (name: Layout) => {
        return layouts.get(name);
    }

    return {
        getLayout,
    }
}

export { newLayoutManager };
export type { Layout };
