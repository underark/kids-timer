function createInput(type, name, id) {
    const input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.id = id;
    return input;
}
;
function createTaskCard(t) {
    const container = document.createElement("div");
    container.textContent = t.name;
    return container;
}
;
export { createInput, createTaskCard };
//# sourceMappingURL=helpers.js.map