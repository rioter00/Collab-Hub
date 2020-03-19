// http://beardscript.com/networking/socket-io-authoritative-server-for-unity/

// https://socket.io/get-started/chat/
// https://github.com/socketio/socket.io/blob/master/examples/chat/public/main.js
// https://github.com/socketio/socket.io
// https://stackoverflow.com/questions/10342681/whats-the-difference-between-io-sockets-emit-and-broadcast

// server setup
const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 80;

// Routing
app.use(express.static(path.join(__dirname, 'public')));

// data structures
let users = [];
var ids;
var headers;

function addUsers(id) {
  if (!users.includes(id)) {
    users.push(id);
  }
}

function removeUser(id) {
  if (users.includes(id)) {
    users.pull(id);
  }
}

function listUsers() {
  socket.emit('users', users);
  console.log(...users);
}

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// "Listens" for client connections
io.sockets.on('connection', function(socket) {
  // print in server console the socket's id
  console.log('New user connected: ' + socket.id);
  addUsers(socket.id);
  // print the number of users
  console.log('Users connected: ' + users);
  // emits connection established event (from server back to client)
  socket.emit('connectionEstabilished-max', {
    id: socket.id
  });
  // broadcasts connection established event to all clients
  socket.broadcast.emit('connectionEstabilishedGlobal', {
    id: socket.id
  });

  socket.on('getUsers', function() {
    listUsers();
  });

  // remove user
  socket.on('disconnect', function(socket) {
    removeUser(socket.id);
    console.log('A user disconnected - ' + socket.id);
  });
});



http.listen(PORT, () => console.log(`Listening on ${ PORT }`));
