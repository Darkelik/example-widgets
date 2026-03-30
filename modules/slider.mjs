export default {
    render({ model, el }) {

        const div_container = document.createElement('div');
        div_container.classList.add('slider-container');
        
        const div_solutions = document.createElement('div');
        div_solutions.classList.add('container');

        const label_solutions = document.createElement('label');
        label_solutions.classList.add('switch');

        const input_solutions = document.createElement('input');
        input_solutions.type = 'checkbox';
        input_solutions.id = "cb-solutions";

        input_solutions.addEventListener('change', () => {
            const checked = input_solutions.checked;
            window.__solutionsToggleState = checked;
            window.dispatchEvent(new CustomEvent('solutions-toggle', { detail: { open: checked } }));
            // console.log('slider: dispatched solutions-toggle', checked);
        });

        const slider_solutions = document.createElement('div');
        slider_solutions.classList.add('slider');
        slider_solutions.classList.add('round');

        const p = document.createElement('p');
        p.innerHTML = "Solutions";
        
        label_solutions.appendChild(input_solutions);
        label_solutions.appendChild(slider_solutions);
        label_solutions.appendChild(p);
        div_solutions.appendChild(label_solutions);

        const div_notes = document.createElement('div');
        div_notes.classList.add('container');

        const label_notes = document.createElement('label');
        label_notes.classList.add('switch');

        const input_notes = document.createElement('input');
        input_notes.type = 'checkbox';
        input_notes.id = "cb-notes";

        input_notes.addEventListener('change', () => {
            const checked = input_notes.checked;
            window.__notesToggleState = checked;
            window.dispatchEvent(new CustomEvent('notes-toggle', { detail: { show: checked } }));
            // console.log('slider: dispatched notes-toggle', checked);
        });

        const slider_notes = document.createElement('div');
        slider_notes.classList.add('slider');
        slider_notes.classList.add('round');

        const p2 = document.createElement('p');
        p2.innerHTML = "Notes enseignants";
        
        label_notes.appendChild(input_notes);
        label_notes.appendChild(slider_notes);
        label_notes.appendChild(p2);
        div_notes.appendChild(label_notes);

        div_container.appendChild(div_solutions);
        div_container.appendChild(div_notes);

        el.appendChild(div_container);

        return () => {
            div_container.remove();
        };
    },
};