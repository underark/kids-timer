import { App } from "./app/app.js";
// Functions beginning with i_**** in this codebase mark that the function has side effects and so is impure
const app = new App();
console.log(app);
document.addEventListener("DOMContentLoaded", () => {
    app.start();
});
//# sourceMappingURL=main.js.map