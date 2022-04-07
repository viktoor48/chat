const modal_wrapper = document.querySelector('#modal-wrapper');
const modal__close = document.querySelector('#modal__close');


modal__close.addEventListener('click', () => {
    modal_wrapper.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target == modal_wrapper) {
        modal_wrapper.style.display = 'none';
    }
});

function toggleMenu(menu){
    menu.classList.toggle('change');
}

function toCamelCase(str){
    return str.split('-').map((word, index) => {
        if(index == 0){
            return word;
        } else {
            console.log(word[0].toUpperCase() + word.slice(1));
            console.log('slice', word.slice(1));
            return word[0].toUpperCase() + word.slice(1);
        }
    }).join('');
}

console.log(toCamelCase('the_stealth-warrior'));