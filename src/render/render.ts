import type { Layout } from "../layouts/layouts.js";

interface AppState { state: Layout }

class Render {
    layouts: Map<Layout, HTMLDivElement>;

    constructor(layouts: Map<Layout, HTMLDivElement>) {
        this.layouts = layouts;
    }

    render(state: AppState) {
        clearBody();
        this._appendLayout(state.state);
    }

    _appendLayout(state: Layout) {
        const body = document.querySelector("body");
        const layout = this.layouts.get(state);
        body?.appendChild(layout!);
    }
}

function clearBody() {
    const body = document.querySelector("body");
    while (body?.hasChildNodes()) {
        body.removeChild(body.lastChild!);
    }
}


export type { AppState };
export { Render };
