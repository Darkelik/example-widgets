export default {
    render({ model, el }) {
        // Élément invisible pour contrôler les notes
        const controller = document.createElement('div');
        controller.style.display = 'none';
        el.appendChild(controller);

        const applyNotesVisibility = (show) => {
            // Chercher les admonitions qui contiennent le titre "Note aux enseignants"
            const notes = Array.from(document.querySelectorAll('.myst-admonition'))
                .filter(note => {
                    const titleElement = note.querySelector('.myst-admonition-header-text');
                    return titleElement && titleElement.textContent.includes('Note aux enseignants');
                });
            console.log('Notes trouvées:', notes);
            console.log('Tous les admonitions:', document.querySelectorAll('.admonition'));
            notes.forEach(note => {
                note.style.display = show ? 'block' : 'none';
            });
        };

        const onNotesToggle = (event) => {
            applyNotesVisibility(event?.detail?.show);
        };

        window.addEventListener('notes-toggle', onNotesToggle);

        return () => {
            window.removeEventListener('notes-toggle', onNotesToggle);
            controller.remove();
        };
    },
};