export default {
    render({ model, el }) {

        const div0 = document.createElement('div');
        div0.classList.add('slider-container');
        
        const div1 = document.createElement('div');
        div1.classList.add('container');

        const label = document.createElement('label');
        label.classList.add('switch');

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = "cb-solutions";

        const div2 = document.createElement('div');
        div2.classList.add('slider');
        div2.classList.add('round');

        const p = document.createElement('p');
        p.innerHTML = "Solutions";
        
        label.appendChild(input);
        label.appendChild(div2);
        label.appendChild(p);
        div1.appendChild(label);

        const div3 = document.createElement('div');
        div3.classList.add('container');

        const label2 = document.createElement('label');
        label2.classList.add('switch');

        const input2 = document.createElement('input');
        input2.type = 'checkbox';
        input2.id = "cb-notes";

        const div4 = document.createElement('div');
        div4.classList.add('slider');
        div4.classList.add('round');

        const p2 = document.createElement('p');
        p2.innerHTML = "Notes enseignants";
        
        label2.appendChild(input2);
        label2.appendChild(div4);
        label2.appendChild(p2);
        div3.appendChild(label2);

        div0.appendChild(div1);
        div0.appendChild(div3);

        el.appendChild(div0);

        return () => {
            div0.remove();
        };
    },
};