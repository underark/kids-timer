import { App } from "./app/app.js";

// Functions beginning with i_**** in this codebase mark that the function has side effects and so is impure
const app = new App();
console.log(app);

document.addEventListener("DOMContentLoaded", () => {
    app.i_changeLayout("main");

    const form = document.querySelector("form");
    form?.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData(form);
        app.i_changeLayout("timer");
        const time = data.get("time")?.toString();
        app.i_startTimer(time!);
    });
});

