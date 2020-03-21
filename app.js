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
let controls = [];

// "Listens" for client connections
io.on('connection', function(socket) {
  // print in server console the socket's id
  console.log('New user connected: ' + socket.id);
  addUsers(socket.id);
  // print the number of users
  console.log('Users connected: ' + users.id);
  // emits connection established event (from server back to client)
  socket.emit('connectionEstabilished-max', {
    id: socket.id
  });
  // broadcasts connection established event to all clients
  socket.broadcast.emit('connectionEstabilishedGlobal', {
    id: socket.id
  });

  socket.broadcast.emit('users', users);

  socket.on('clearUsers', function() {
    socket.broadcast.emit('serverMessage', 'clearing user list');
    console.log("Clearing user list...");
    clearUsers();
  });

  // return a list of lists
  socket.on('addUsername', function(data) {
    for(let user of users){
      if(user.id == socket.id){
        user.username = data;
        console.log("updated username to id: " + socket.id);
        return;
      }
    }
    console.log("create new username and id " + data + " " + socket.id);
    users.push({id: socket.id, username:data});
  });

  // return a list of lists
  socket.on('getUsers', function() {
    listUsers();
  });

  // clear users
  socket.on('clearUsers', function() {
    clearUsers();
  });

  // remove user
  socket.on('disconnect', function() {
    removeUser(socket.id);
    console.log('A user disconnected - ' + socket.id);
  });

  socket.on('control', function(data) {
    console.log("control: " + data.header + " - " + data.values);
    // updating existing headers
    for (let i = 0; i < controls.length; i++) {
      let control = controls[i];
      // console.log("chekcing index: " + i);
      // console.log(control.header);
      if (control.header == data.header) {
        // console.log("match!");
        control.values = data.values;
        // console.log('adding values to ' + data.header);
        return;
      }
    }
    // create new headers
    var newValues = {};
    // for(let value for data. )

    controls.push({
      header: data.header,
      values: data.values
    });
    // updateControl(data.header, data.values);
    console.log('New Control Data: ' + data.header + " - " + data.values);
    console.log(controls);
  });

  socket.on('getControl', function(data) {
    console.log(data);
    if (data == 'dump') {
      console.log("dumping all control data");

      // returns object / dict
      socket.emit('controlDump', dumpControlValues());
    } else {
      var values = getControlValues(data);
      if (values != null) {
        socket.emit('control', values.header, values.values);
      } else {
        socket.emit('control', -1);
      }
    }
    // console.log('Getting Control Data...: ' + data + " - " + values.values);
  });

  // functions
  function clearUsers() {
    users = [];
  }

  function addUsers(data) {
    for(let user of users){
      if (user.id == data) {
        console.log("matched id");
        break;
      }
    }
    console.log("no matched ids");
    users.push({id: data, username:''});
  }

  function removeUser(id) {
    if (users.includes()) {
      users.pull(id);
    }
  }

  function listUsers() {
    socket.emit('users', users);
    console.log(...users);
  }

  function updateControl(data) {

  }

  function dumpControlValues(){
    return controls;
  }

  function getControlValues(header) {
    for (let control of controls) {
      console.log(control.header);
      if (control.header == header) {
        console.log('match! ' + control.values);
        // let controlData = control;
        return control;
        //return control;
      }
    }
    console.log("No such control values. " + header);
    return null;
  }
});



http.listen(PORT, () => console.log(`Listening on ${ PORT }`));
