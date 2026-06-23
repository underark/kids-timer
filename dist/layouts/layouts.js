import { createInput, createTaskCard } from "./helpers.js";
// TODO: Move this to a class?
const newLayoutManager = (dispatch, tasks) => {
    const cards = tasks.map((t) => createTaskCard(t));
    const createMainForm = () => {
        const form = document.createElement("form");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = new FormData(form);
            const time = data.get("time");
            dispatch({ msg: "start_timer", end: time?.toString() });
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
        return new Map([
            ["main", main()],
            ["timer", timer()],
        ]);
    };
    return {
        getLayouts,
    };
};
export { newLayoutManager };
//# sourceMappingURL=layouts.js.map