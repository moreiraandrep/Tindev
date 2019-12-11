const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes'); //importando o arquivo de rotas

const app = express(); //cria um servidor http e atribui a const app

/* Importa o protocolo http padrão do Node, 
e uni com um servidor web socket para aceitar requisições http e web sockets*/
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
   const { user } = socket.handshake.query;

   connectedUsers[user] = socket.id;
});

mongoose.connect(
   'mongodb+srv://tindev:tindev@cluster0-jcvtc.mongodb.net/tindev?retryWrites=true&w=majority', {
   useNewUrlParser: true
});

//Enviado as info dos sockets p/ Controllers
app.use((req, res, next) => {
   req.io = io;
   req.connectedUsers = connectedUsers;

   return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

//a const server fica "ouvindo" requisições HTTP na porta 3333
server.listen(3333);