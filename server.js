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

    socket.on('adduser', ( user ) => {
        console.log('Новый user ' + user.name, user.nick, user.image, socket.id);
        user.socketID = socket.id;
        users.push(user);
        updateClients();
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

    socket.on('changeImage', (currentUser) => {
        for (let user of users) {
            if (currentUser.socketID == user.socketID) {
                user.image = currentUser.image;
            }
        }

        updateClients();
    })

    socket.on('chat message', (currentUser) => {
        for (let i = 0; i < users.length; i++) {
            if (users[i].socketID == currentUser.socketID) {
                users[i].lastMes = currentUser.lastMes;
            }
        }

        socket.emit('my message', currentUser);
        socket.broadcast.emit('chat message', currentUser);

        updateClients();
    })

    function updateClients() {
        io.emit('update', users);
    }
})
