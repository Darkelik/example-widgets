export default {
    render({ model, el }) {
        // Élément invisible pour contrôler les notes
        const controller = document.createElement('div');
        controller.style.display = 'none';
        el.appendChild(controller);

        const applyNotesVisibility = (show) => {
            const notes = document.querySelectorAll('.notes-enseignants');
            notes.forEach(note => {
                note.style.display = show ? 'block' : 'none';
            });
        };

        const onNotesToggle = (event) => {
            applyNotesVisibility(event?.detail?.show);
        };

        window.addEventListener('notes-toggle', onNotesToggle);

        if (typeof window.__notesToggleState === 'boolean') {
            applyNotesVisibility(window.__notesToggleState);
        }

        return () => {
            window.removeEventListener('notes-toggle', onNotesToggle);
            controller.remove();
        };
    },
};