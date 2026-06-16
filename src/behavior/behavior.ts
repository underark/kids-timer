import { newBackend } from "../backend/backend.js";

interface Backend {
    i_startTimer(end: string): void;
    i_changeLayout(layout: HTMLDivElement): void;
}

const newBehaviorManager = () => {
    const backend: Backend = newBackend();

    const initForm = (form: HTMLFormElement, layout: HTMLDivElement) => {
        form?.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = new FormData(form);
            backend.i_changeLayout(layout);
            const time = data.get("time")?.toString();
            backend.i_startTimer(time!);
        });
    }

    return {
        initForm,
    }
}

export { newBehaviorManager };
export type { Backend };
