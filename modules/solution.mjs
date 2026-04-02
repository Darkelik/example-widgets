export default {
    render({ model, el }) {

        const solution = document.createElement('details');
        solution.classList.add('solution');
        solution.classList.add('alert');
        solution.innerHTML = model.get('content');

        const summary = document.createElement('summary');
        summary.innerHTML = model.get('title');

        solution.appendChild(summary);

        el.appendChild(solution);

        const applyState = (open) => {
            if (typeof open === 'boolean') {
                solution.open = open;
            }
        };

        const onSolutionsToggle = (event) => {
            applyState(event?.detail?.open);
        };

        window.addEventListener('solutions-toggle', onSolutionsToggle);

        return () => {
            window.removeEventListener('solutions-toggle', onSolutionsToggle);
            solution.remove();
        };
    },
};