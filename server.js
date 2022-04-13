//import ws from "ws";
//const {WebSocketServer} = ws;
import {v4 as uuid} from "uuid";
const clients = {};

import WebSocket, { WebSocketServer } from 'ws'

// const wss = new WebSocketServer.Server({
//     port: 8080
// });

const wss = new WebSocketServer({
   port: 8080
});

wss.on('connection', (ws) => {
    const id = uuid()
    clients[id] = ws;

    console.log(`new client ${id}`);

    ws.on('message', (rawMessage) => {

    })

    ws.on('close', () => {
        delete clients[id];
        console.log(`client is close ${id}`);
    })
})
