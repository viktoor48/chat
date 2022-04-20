document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    let userList = [];

    const modalAuthForm = document.querySelector('#modal-wrapper-auth');
    const authForm = document.querySelector('#authForm');
    const defaultImage = document.querySelector('#default-img');
    const usersOnline = document.querySelector('#users-Online');

    const userInfoName = document.querySelector('.user-info__name');

    let currentUser = {};
    let countOnline = 0;

    function sendForm(event) {
        event.preventDefault();

        const name = authForm.elements.name.value;
        const nickname = authForm.elements.nickname.value;
        const img = 'image/img_avatar_mes.png';

        if(name && nickname) {
            modalAuthForm.style.display = 'none';
            userInfoName.textContent = name;

            currentUser.name = name;
            currentUser.nick = nickname;
            currentUser.image = img;
            currentUser.lastMes = 'Сообщение...';
            currentUser.socketID = socket.id;

            console.log('Current user ' + currentUser.name, currentUser.nick, currentUser.image, socket.id);

            socket.emit('adduser', {
                name: name,
                nick: nickname,
                image: img,
                lastMes: 'Сообщение...'
            });
        }
    }

    socket.on('update', (users) => {
        const chatList = document.querySelector('.chat-list');
        chatList.innerHTML = '';
        console.log('update');
        countOnline = users.length;
        usersOnlineCount();

        for (let user of users) {
            renderUsersOnline(user, chatList);
        }
    })

    function renderUsersOnline(user, chatList) {
        let item = `<li class="chat-list__chat">
                                        <div class="avatar">
                                            <img src="${user.image}" alt="">
                                        </div>
                                        <div class="user-caption">
                                            <div class="dialog-title">
                                                <span>${user.name}</span>
                                            </div>
                                            <div class="dialog-subtitle">
                                                <span class="user-last-message">${user.lastMes}</span>
                                            </div>
                                        </div>
                                    </li>`;

        chatList.innerHTML += item;
        console.log('render');
    }

    authForm.addEventListener('submit', sendForm);

    const btnSendMessage = document.querySelector('#send-message');
    const inputMessage = document.querySelector('#message');

    function sendMessage() {
        if (inputMessage.value) {
            const message = inputMessage.value;
            const date = new Date();
            let hour = date.getHours();
            let minutes = date.getMinutes();
            let currentDate = `${hour}:${minutes}`;

            currentUser.lastMes = message;
            currentUser.date = currentDate;

            socket.emit('chat message', currentUser);
            inputMessage.value = '';
        }
    }

    btnSendMessage.addEventListener('click', sendMessage);

    inputMessage.addEventListener('change', sendMessage);

    const chatContainer = document.querySelector('#chat-container');

    socket.on('my message', (currentUser) => {
        let myTemplate = `<div class="message-row message-row-right">
                                    <div class="message-row__text">
                                        <p class="message__text">${currentUser.lastMes}</p>
                                        <span class="message-time message-time-right">${currentUser.date}</span>
                                    </div>
                                    <div class="user-avatar">
                                        <img src="${currentUser.image}">
                                    </div>
                                </div>`;

        chatContainer.innerHTML += myTemplate;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    })

    socket.on('chat message', (user) => {
        let usersTemplate = `<div class="message-row message-row-left">
                                    <div class="message-row__text">
                                        <p class="message__text">${user.lastMes}</p>
                                        <span class="message-time message-time-left">${user.date}</span>
                                    </div>
                                    <div class="user-avatar user-avatar-left">
                                        <img src="${user.image}">
                                    </div>
                                </div>`;

        chatContainer.innerHTML += usersTemplate;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    })

    function usersOnlineCount() {
        let count = countOnline;
        let end = '';

        if (count > 10 && count < 20 || count >= 5) {
            end = 'ов'
        } else if (count >= 2 && count <= 4) {
            end = 'a'
        }
        usersOnline.textContent = `${count} участник${end}`
    }

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

        currentUser.image = theImage;
        socket.emit('changeImage', currentUser);

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

});


