import type { Task } from "../app/app.js";

function createInput(type: string, name: string, id: string) {
    const input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.id = id;
    return input;
};

function createTaskCard(t: Task) {
    const container = document.createElement("div");
    container.textContent = t.name;
    return container;
};

export { createInput, createTaskCard };

