export default {
    render({ model, el }) {
        let div = document.createElement("div");
        div.classList.add("form-check");
        let btn = document.createElement("button");
        btn.type = "checkbox";
        btn.classList.add("form-check-input");
        let text = document.createElement("span");
        text.innerHTML = model.get("text") ?? "Toggle me!";

        //TODO : update zones

        div.appendChild(btn);
        div.appendChild(text);
        el.appendChild(div);

        return () => {
            div.remove();
        };
    },
};