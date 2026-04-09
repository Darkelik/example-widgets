// UNUSED
export default {
    render({ model, el }) {
        show_hide_solution_init();

        return () => { }
    }
}

function show_hide_solution_init() {
    // Transform the dom to make the solution and hidden test regions foldable
    make_foldable_environment("p", "BEGIN SOLUTION", "END SOLUTION", "Solution", "consultée", "alert alert-success solution");
    make_foldable_environment("span", "BEGIN SOLUTION", "END SOLUTION", "Solution", "consultée", "alert alert-success solution");
    make_foldable_environment("span", "HIDDEN TEST", "END HIDDEN TEST", "Tests cachés", "consultés", "hidden-tests");

    // Add to the header, activate, and restore session state for two sliders:
    let header_buttons = $(".article-header-buttons")[0]
    // To control whether the instructor notes are shown
    add_switch(header_buttons, "show-instructor-notes-slider", "Notes enseignants", show_instructor_notes);
    // To control whether the solutions are globally shown
    add_switch(header_buttons, "show-solutions-slider", "Solutions", show_solutions);
}

$(document).ready(show_hide_solution_init);

function make_foldable_environment(tag_type, start_string, stop_string, title, shown_title, classes) {
    let starts = $(tag_type+":contains('"+start_string+"')");
    let stops = $(tag_type+":contains('"+stop_string+"')");
    for ( let i = 0; i < starts.length; i++ ) {
        let start = starts[i];
        let stop = stops[i];
        let parent = start.parentNode;
        // This did happen a couple times; a node disconnected from the DOM?
        if ( parent == null ) break;
        let startindex = Array.prototype.indexOf.call(parent.childNodes, start);
        let stopindex = Array.prototype.indexOf.call(parent.childNodes, stop);

        let range = new Range();
        range.setStart(parent, startindex);
        range.setEnd(parent, stopindex);

        paths = $(document)[0].URL.split('/')
        dir = paths[paths.length-2]

        if ( $(document)[0].URL.match(with_solutions_regexp)) {
            let details = document.createElement("details");
            details.className = classes;
            range.surroundContents(details);
            start.remove();
            stop.remove();
            details.innerHTML = "<summary>"+title+"<span class='consult' hidden=''> (<b>"+shown_title+"</b>)</span></summary>" + details.innerHTML;
            details.addEventListener("toggle", function() {
                if (details.open) {
                    details.firstChild.lastChild.hidden = false
                }
            })
        } else {
            range.deleteContents()
            stop.remove();
        }
    }
}

function show_instructor_notes(visible) {
    for (let title of $(".admonition-title:contains('Notes aux enseignants')")) {
        note = title.parentElement;
        note.hidden = ! visible;
    }
    for (let title of $(".admonition-title:contains('à faire')")) {
        note = title.parentElement;
        note.hidden = ! visible;
    }
}

function show_solutions(visible) {
    for (let detail of $(".solution")) {
	    detail.open = visible;
    }
}

/**
 * Add a switch with persistence to control whether a feature is shown or not
 * @parent: the switch will be inserted as first child of that parent
 * @id: a unique html id
 * @label: the user visible label for the switch
 * @show: a function taking a boolean and shows/hides accordingly the feature
 **/
function add_switch(parent, id, label, show) {

    var aswitch = document.createElement("div")
    aswitch.className = "form-check form-check-inline form-switch"
    aswitch.innerHTML = `
    <label class="form-check-label" for="`+id+`">`+label+`</label>
    <input class="form-check-input" type="checkbox" role="switch" id="`+id+`">`;

    parent.insertBefore(aswitch, parent.firstChild)

    slider = $('#'+id);
    checked = sessionStorage.getItem(id) === "true"
    slider[0].checked = checked
    show(checked)
    slider.on('change', function(){
        checked = $(this).is(':checked')
        show(checked)
        sessionStorage.setItem(id, checked)
    });
}