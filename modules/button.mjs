export default {
    render({ model, el }) {

        const button = document.createElement('button');
        button.classList.add('button-widget-test');
        button.innerHTML = model.get('title');

        button.addEventListener('click', () => {
            alert(model.get('content'));
        });

        el.appendChild(button);

        return () => {
            button.remove();
        };
    },
};