import { newBackend } from "../backend/backend.js";
const newBehaviorManager = () => {
    const backend = newBackend();
    const initForm = (form, layout) => {
        form?.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = new FormData(form);
            backend.i_changeLayout(layout);
            const time = data.get("time")?.toString();
            backend.i_startTimer(time);
        });
    };
    return {
        initForm,
    };
};
export { newBehaviorManager };
//# sourceMappingURL=behavior.js.map