const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { v4: uuid } = require('uuid');

const app = express();
const server = http.Server(app);
const port = process.env.PORT || 3000;
const io = socketIO(server);

let users = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static('./'));

server.listen(port, () => {
    console.log('listening on *:' + port);
});

io.on('connection', socket => {
    socket.name = uuid();
    //socket.emit('set username', socket.id);//отправляем сообщение конкретно этому сокету
    socket.on('adduser', (name, nickname, img, user) => {
        console.log('Новый user ' + name, nickname, img, socket.id);
        user.socketID = socket.id;
        users.push(user);
        for (let user of users) {
            console.log(user.name, user.nick, user.image, user.socketID);
        }
    })

    socket.on('disconnect', () => {
        for (let i = 0; i < users.length; i++) {
            if (users[i].socketID == socket.id) {
                users.splice(i, 1);
            }
        }

        for (let user of users) {
            console.log('Пользователи после удаления ' + user.name, user.nick, user.image, user.socketID);
        }

        updateClients();
    })

    function updateClients() {
        io.emit('update', users);
    }
})


//io.clients().connected(); //список всех подключенных клиентов










// import WebSocket, { WebSocketServer } from 'ws'
// import {v4 as uuid} from "uuid";
// const clients = {};
// const messages = [];
//
// const wss = new WebSocketServer({
//     port: 8080
// });
//
// wss.on('connection', (ws) => {
//     const id = uuid()
//     clients[id] = ws;
//
//     console.log(`New client ${id}`);
//     ws.username = id;
//     console.log(ws.username);
//
//     //слушаем смс от клиента
//     ws.on('message', (rawMessage) => {
//         const {name, nickname, img} = JSON.parse(rawMessage);
//         messages.push({name, nickname, img});
//         for (const id in clients) {
//             clients[id].send(JSON.stringify([{name, nickname, img}]));
//         }
//     })
//
//     //если клиент закрылся
//     ws.on('close', () => {
//         delete clients[id];
//         console.log(`Client is closed ${id}`);
//     })
// })
