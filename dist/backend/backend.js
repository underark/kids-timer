import { Timer } from "../timer/timer.js";
const newBackend = () => {
    let timer = { running: false, value: null };
    let lastTimestamp = 0;
    const i_startTimer = (end) => {
        _i_createTimer(end);
        const loop = _createLoop();
        requestAnimationFrame(loop);
    };
    const _i_createTimer = (end) => {
        const t = new Timer(new Date(), end);
        timer = { running: true, value: t };
    };
    // There is technically a bug here where the last scheduled animation loop will execute without being cancelled
    const i_cancelTimer = () => {
        timer = { running: false, value: null };
        lastTimestamp = 0;
    };
    const _diffLastTimestamp = (timestamp) => {
        return timestamp - lastTimestamp;
    };
    const _createLoop = () => {
        const i_loop = (timestamp) => {
            if (timer.running === true && _diffLastTimestamp(timestamp) >= 16) {
                const div = document.querySelector("#progress");
                const elapsed = timer.value.calculateElapsed();
                div.textContent = elapsed.toString();
                if (elapsed >= 100) {
                    i_cancelTimer();
                    return;
                }
                lastTimestamp = timestamp;
            }
            requestAnimationFrame(i_loop);
        };
        return i_loop;
    };
    const i_changeLayout = (layout) => {
        const body = document.querySelector("body");
        i_clearBody(body);
        body?.append(layout);
    };
    return {
        i_startTimer,
        i_changeLayout,
    };
};
function i_clearBody(body) {
    while (body.hasChildNodes()) {
        body.removeChild(body.lastChild);
    }
}
export { newBackend };
//# sourceMappingURL=backend.js.map