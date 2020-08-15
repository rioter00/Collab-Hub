// --------------------------------------------------------------------------
// This is the javascript required for interactive data retrieval from
// the Max-based SocketIO (client).
// Authors: Nick Hwang, Tony T Marasco, Eric Sheffield
// Contact: nickthwang@gmail.com
// --------------------------------------------------------------------------

var socketid = 'socket';


const maxAPI = require('max-api'),
  io = require('socket.io-client'),
  // socket = io.connect('http://remote-collab.herokuapp.com/');
  socket = io.connect(`http://localhost:3000/hub`);


socket.on('connect', () => {
  maxAPI.outlet("Connected to server");
  maxAPI.outlet("Connected");
});

maxAPI.addHandler('joinRoom', (room) => {
  maxAPI.outlet("Joining room" + room);
  socket.emit('joinRoom', room);
});

maxAPI.addHandler('leaveRoom', (room) => {
  maxAPI.outlet("leaving room" + room);
  socket.emit('leaveRoom', room);
});

maxAPI.addHandler('myRooms', () => {
  socket.emit('myRooms');
});

maxAPI.addHandler('allRooms', () => {
  socket.emit('allRooms');
});

maxAPI.addHandler('observeallcontrol', (bool) => {
  if(typeof bool === 'number'){
    if(bool == 1){
      bool = 'true';
    }
    if(bool == 0){
      bool = 'false';
    }
  }
  socket.emit('observeAllControl', bool);
})

maxAPI.addHandler('observeallevents', (bool) => {
  if(typeof bool === 'number'){
    if(bool == 1){
      bool = 'true';
    }
    if(bool == 0){
      bool = 'false';
    }
  }
  socket.emit('observeAllEvents', bool);
})

// events

maxAPI.addHandler('event', (header) => {
  socket.emit('event', header);
  console.log('event sent: ' + header);
  maxAPI.outlet(["event", header]);
})

maxAPI.addHandler('chat', (data) => {
  socket.emit('chat', data);
  console.log('chat sent: ' + data);
})


maxAPI.addHandler('getEvents', () => {
  socket.emit('getEvents');
  console.log('getList of Events');
})

maxAPI.addHandler('clearEvents', () => {
  socket.emit('clearEvents');
  console.log('clearing list of Events');
})


maxAPI.addHandler('control', (head, ...vals) => {
  console.log("val length: " + vals.length);
  const newControl = {
    header: head,
    values: vals
  };
  console.log(newControl);
  socket.emit('control', newControl);
  console.log('sending control: ' + head + " - " + vals);
});

maxAPI.addHandler('clearControls', () => {
  socket.emit('clearControls');
  console.log('clearControls called');
});

maxAPI.addHandler('getControl', (header) => {
  socket.emit('getControl', header);
  console.log('requesting control: ' + header);
});

maxAPI.addHandler('addUsername', (name) => {
  socket.emit('addUsername', name);
  console.log('addUsername called');
});

maxAPI.addHandler('getUsers', () => {
  socket.emit('getUsers');
});

maxAPI.addHandler('clearUsers', () => {
  socket.emit('clearUsers');
  console.log('clearUsers called');
});

maxAPI.addHandler('setServerConsole', (val) => {
  socket.emit('setConsoleDisplay', val);
});

maxAPI.addHandler('observeControl', (val) => {
  console.log('observing', val);
  socket.emit('observeControl', val);
});

maxAPI.addHandler('unobserveControl', (val) => {
  console.log('unobserving', val);
  socket.emit('unobserveControl', val);
});

maxAPI.addHandler('observeEvent', (val) => {
  console.log('observing', val);
  socket.emit('observeEvent', val);
});

maxAPI.addHandler('unobserveEvent', (val) => {
  console.log('unobserving', val);
  socket.emit('unobserveEvent', val);
});

socket.on('chat', function (data) {
  console.log('chat message received');
  maxAPI.outlet(["chat", data]);
})

socket.on('serverMessage', function (data) {
  console.log('Message from Server: ' + data);
  maxAPI.outlet(["serverMessage", data]);
});

socket.on('users', function (data) {
  console.log('list of users: ' + data);
  // console.log(Object.values(data));
  console.table(data);
  var users = {
    Users: data
  }
  maxAPI.outlet(["users", users]);
});

socket.on('event', function (header) {
  console.log('received event: ' + header);
  maxAPI.outlet(["event", header]);
});

socket.on('events', function (data) {
  console.log('lists of events: ' + data);
  let events = {
    'Events': data
  }
  maxAPI.outlet(["events", events]);
});

socket.on('myRooms', function (data) {
  let myRooms = {
    'My Rooms': data
  }
  console.log("my rooms.....");
  console.table(myRooms);
  maxAPI.outlet(["rooms", myRooms]);
  console.log('rooms output');
});

socket.on('allRooms', function (data) {
  let allRooms = {
    'All Rooms': data
  }
  console.log("all rooms.....");
  console.table(allRooms);
  maxAPI.outlet(["allRooms", allRooms]);
  console.log('rooms output');
});

// socket.on('seconds', (data) => {
//   console.log('seconds logged?');
//   // maxAPI(outl)
// })

socket.on('control', function (head, vals) {
  console.log('control ' + head + " " + vals);
  // use spread operator regardless if single or multiple datum.
  // console.log('val length: ' + vals);
  if (vals == null || vals == 'undefined') {
    console.log('header undefined');
    maxAPI.outlet(["control", head, "noHeader"]);
  } else {
    maxAPI.outlet(["control", head, ...vals]);
  }
});

socket.on('controlDump', function (obj) {
  console.log('controlDump ' + obj);
  let controls = {
    'Controls: ': obj
  }
  //maxAPI.outlet(["control", head + " " + vals]);
  maxAPI.outlet(["controlDump", controls]);
});
