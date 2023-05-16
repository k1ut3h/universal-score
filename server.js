const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = 3000;

app.get('/', (req, res)=>{
    res.sendFile(__dirname+"/index.html");
});

let score = {value:0};

io.on("connection", (socket)=>{

    socket.on('score plus', ()=>{
        score.value++;
        io.emit('score plus', score.value);
    });

    socket.on('score minus', ()=>{
        score.value--;
        io.emit('score minus', score.value);
    });
});

server.listen(port, () => {
    console.log(`Listening on localhost:${port}`);
});
