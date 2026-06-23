import { newBackend } from "../backend/backend.js";
const newBehaviorManager = () => {
    const backend = newBackend();
    const initForm = (form, layoutFunc) => {
        form?.addEventListener("submit", (e) => {
            e.preventDefault();
            const layout = layoutFunc.apply("", []);
            const data = new FormData(form);
            backend.i_changeLayout(layout);
            const time = data.get("time")?.toString();
            backend.i_startTimer(time);
        });
    };
    const initStopButton = (button, layoutFunc) => {
        button.addEventListener("click", () => {
            const layout = layoutFunc();
            backend.i_cancelTimer();
            backend.i_changeLayout(layout);
        });
    };
    return {
        initForm,
        initStopButton,
    };
};
export { newBehaviorManager };
//# sourceMappingURL=behavior.js.map