const modal_auth = document.querySelector('#modal-wrapper-auth');
const modal_auth__close = document.querySelector('#modal__close');
const btn_settings = document.querySelector('#btn_settings');
const modal_load_photo = document.querySelector('#modal-load-photo');
const btn_load_close = document.querySelector('#btn_close_photo');
const avatarUserCustom = document.querySelector('#avatar-user-custom');
const avatarUserDefault = document.querySelector('#avatar-user-default');
const modalPhotoLoad = document.querySelector('#modal-photo-load');
const bigImage = document.querySelector('#big-image');
const btnCancel = document.querySelector('#btn-cancel');
const btnSave = document.querySelector('#btn-save');
const inputPhoto = document.querySelector('#inputPhoto');

btnSave.addEventListener('click', () => {
    modalPhotoLoad.style.display = 'none';
    modal_load_photo.classList.add('invisible');
});

btnCancel.addEventListener('click', () => {
    avatarUserCustom.classList.add('invisible');
    avatarUserDefault.style.display = 'flex';
    avatarUserCustom.src = "";
    modalPhotoLoad.style.display = 'none';
    inputPhoto.value = '';
});

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


const fileReader = new FileReader();

fileReader.addEventListener('load', () => {
    let theImage = fileReader.result;
    avatarUserCustom.classList.remove('invisible');
    avatarUserDefault.style.display = 'none';
    avatarUserCustom.src = theImage;
    modalPhotoLoad.style.display = 'flex';
    bigImage.src = theImage;
    console.log('файл был загружен');
});

inputPhoto.addEventListener('change', (e) => {
    const [file] = e.target.files;

    console.log('были изменение в файле');
    if (file) {
        if (file.size > 300 * 1024) {
            alert('Слишком большой файл');
        } else {
            fileReader.readAsDataURL(file);
        }
    }
});

