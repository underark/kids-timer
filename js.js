document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const date = data.get("time");
        console.log(date);
    })
})
