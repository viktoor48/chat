const chatContainer = document.querySelector('#chat-container');
const btnSendMessage = document.querySelector('#send-message');
const inputMessage = document.querySelector('#message');

const modalAuthForm = document.querySelector('#modal-wrapper-auth');
const authForm = document.querySelector('#authForm');
const defaultImage = document.querySelector('#default-img');

let users = {};


const ws = new WebSocket("ws://localhost:8080");

ws.onmessage = (message) => {
    console.log(JSON.parse(message.data));
}


function sendForm(event) {
    event.preventDefault();
    const name = authForm.elements.name.value;
    const nickname = authForm.elements.nickname.value;
    const img = 'image/avatar.png';

    console.log(users);
    modalAuthForm.style.display = 'none';

    ws.send(JSON.stringify({
        name, nickname, img
    }))


    return false;
}

authForm.addEventListener('submit', sendForm);

function sendMessage(event) {
    const message = inputMessage.value;
    inputMessage.value = '';
    console.log(message);
    let now = new Date();
    let time = now.getTime();
    console.log(time);

    ws.send(JSON.stringify({
        message
    }))
}

btnSendMessage.addEventListener('click', sendMessage);

inputMessage.addEventListener('change', sendMessage);
