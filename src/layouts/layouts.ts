import type { Task } from "../app/app.js"

type Layout =
    | "main"

const newLayoutManager = (tasks: Task[]) => {
    const taskList = tasks;

    const main = () => {
        const div = document.createElement("div");
        const form = document.createElement("form");
        form.method = "get";
        form.action = "";
        const time = createInput("time", "time", "time");
        const submit = createInput("submit", "submit", "submit");
        const cards = createCards();
        form.append(time, submit);
        div.append(form, ...cards);
        return div;
    }

    const getLayout = (name: Layout) => {
        switch (name) {
            case "main":
                return main();
            default:
                return null;
        }
    }

    const createCards = () => {
        return taskList.map((t) => createTaskCard(t));
    }

    const createTaskCard = (t: Task) => {
        const container = document.createElement("div");
        container.textContent = t.name;
        return container;
    }

    const createInput = (type: string, name: string, id: string) => {
        const input = document.createElement("input");
        input.type = type;
        input.name = name;
        input.id = id;
        return input;
    }

    return {
        getLayout,
    }
}

export { newLayoutManager };
export type { Layout };
