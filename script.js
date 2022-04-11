const modal_auth = document.querySelector('#modal-wrapper-auth');
const modal_auth__close = document.querySelector('#modal__close');
const btn_settings = document.querySelector('#btn_settings');
const modal_load_photo = document.querySelector('#modal-load-photo');
const btn_load_close = document.querySelector('#btn_close_photo');
const avatarUserCustom = document.querySelector('#avatar-user-custom');
const avatarUserDefault = document.querySelector('#avatar-user-default');


btn_settings.addEventListener('click', () => {
    modal_load_photo.classList.remove('invisible');
});

btn_load_close.addEventListener('click', () => {
    modal_load_photo.classList.add('invisible');
});

modal_auth__close.addEventListener('click', () => {
    modal_auth.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target == modal_auth__close) {
        modal_auth.style.display = 'none';
    }
});


const inputPhoto = document.querySelector('#inputPhoto');
const fileReader = new FileReader();

fileReader.addEventListener('load', () => {
    let theImage = fileReader.result;
    avatarUserCustom.classList.remove('invisible');
    avatarUserDefault.style.display = 'none';
    avatarUserCustom.src = theImage;
});

inputPhoto.addEventListener('change', (e) => {
    const [file] = e.target.files;

    if (file) {
        if (file.size > 300 * 1024) {
            alert('Слишком большой файл');
        } else {
            fileReader.readAsDataURL(file);
        }
    }
});