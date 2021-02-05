// --------------------------------------------------------------------------
// This is the javascript required for interactive data retrieval from
// the Max-based SocketIO (client).
// Authors: Nick Hwang, Tony T Marasco, Eric Sheffield
// Contact: nickthwang@gmail.com
// --------------------------------------------------------------------------

const max = require('max-api'),
  io = require('socket.io-client'),
  
  // With script start message to node.script, 3rd string is namespace, optional 4th is initial username.
  // Initialy username functionality still needs to be added on server end. 
  namespace = process.argv[2],
  username = process.argv[3],
  socket = io.connect(`https://collab-hub-v2.herokuapp.com/${namespace}`, {query: {username: username} });

// Handling connect/disconnect
socket.on('connect', () => {
    max.outlet('connected', 1);
  });
  
// This function is only useful if the disconnect comes from the server
socket.on('disconnect', () => {
    max.outlet('connected', 0);
});


// --------------------
// Outgoing


// General

max.addHandler('addUsername', newName => {
  socket.emit('addUsername', newName);
});

max.addHandler('getUsers', () => {
  socket.emit('getUsers');
});

max.addHandler('clearUsers', () => {
  socket.emit('clearUsers');
});

max.addHandler('setConsoleDisplay', (bool) => {
  if(typeof bool === 'number'){
    if(bool == 1){
      bool = 'true';
    }
    if(bool == 0){
      bool = 'false';
    }
  }
  socket.emit('setConsoleDisplay', bool);
});


// Rooms

max.addHandler('joinRoom', room => {
  socket.emit('joinRoom', room);
});

max.addHandler('leaveRoom', room => {
  socket.emit('leaveRoom', room);
});

max.addHandler('myRooms', () => {
  socket.emit('myRooms');
});

max.addHandler('allRooms', () => {
  socket.emit('allRooms');
});

max.addHandler('allRoomDetails', () => {
  socket.emit('allRoomDetails');
});


// Controls

max.addHandler('control', (...args) => {
  let outgoing = {};
  if (args[0] == 'public') {
      outgoing.Mode = 'Public',
      outgoing.Header = args[1],
      outgoing.Data = args.slice(2)
  }
  else if (args[0] == 'private') {
      outgoing.Mode = 'Private',
      outgoing.Target = args[1],
      outgoing.Header = args[2],
      outgoing.Data = args.slice(3)
  }
  else {
      outgoing.Mode = 'Public',
      outgoing.Header = args[0],
      outgoing.Data = args.slice(1)
  }
  socket.emit('control', outgoing);
});

max.addHandler('observeControl', (header) => {
  socket.emit('observeControl', header);
});

max.addHandler('unobserveControl', (header) => {
  socket.emit('unobserveControl', header);
});

max.addHandler('observeAllControl', (bool) => {
  if(typeof bool === 'number'){
    if(bool == 1){
      bool = 'true';
    }
    if(bool == 0){
      bool = 'false';
    }
  }
  socket.emit('observeAllControl', bool);
});

max.addHandler('getControls', () => {
  socket.emit('getControls');
});


// Events

max.addHandler('event', (...args) => {
  let outgoing = {};
  if (args[0] == 'public') {
      outgoing.Mode = 'Public',
      outgoing.Header = args[1]
  }
  else if (args[0] == 'private') {
      outgoing.Mode = 'Private',
      outgoing.Target = args[1],
      outgoing.Header = args[2]
  }
  else {
      outgoing.Mode = 'Public',
      outgoing.Header = args[0]
  };
  socket.emit('event', outgoing);
});

max.addHandler('observeEvent', (header) => {
  socket.emit('observeEvent', header);
});

max.addHandler('unobserveEvent', (header) => {
  socket.emit('unobserveEvent', header);
});

max.addHandler('observeAllEvents', (bool) => {
  if(typeof bool === 'number'){
    if(bool == 1){
      bool = 'true';
    }
    if(bool == 0){
      bool = 'false';
    }
  }
  socket.emit('observeAllEvents', bool);
});


// Chat

max.addHandler('chat', (...args) => {
  let outgoing = {
    Target: args[0],
    Data: args.slice(1)
  };
  socket.emit('chat', outgoing);
});


// --------------------



// --------------------
// Incoming from server


// Used to confirm username (not implemented yet)
socket.on('username', (...incoming) => {
  max.outlet('username', incoming);
});


// Generic messages from server
socket.on('serverMessage', (...incoming) => {
  max.outlet('serverMessage', ...incoming);
});


// Other info from server

socket.on('myRooms', data => {
  let myRoomsView = {
    MyRooms: data
  }
  let myRoomsUmenu = {
    items: data
  }
  max.outlet('myRoomsView', myRoomsView);
  max.outlet('myRoomsUmenu', myRoomsUmenu);
});

socket.on('allRooms', data => {
  let allRoomsView = {
    AllRooms: data
  }
  let allRoomsUmenu = {
    items: data
  }
  max.outlet('allRoomsView', allRoomsView);
  max.outlet('allRoomsUmenu', allRoomsUmenu);
});

socket.on('allRoomDetails', data => {
  max.outlet('allRoomDetailsView', data);
  max.outlet('allRoomDetailsUmenu', data);
});

socket.on('users', data => {
  let usersView = {
    Users: data
  }
  let usersUmenu = {
    items: data
  }
  max.outlet('usersView', usersView);
  max.outlet('usersUmenu', usersUmenu);
});

socket.on('events', data => {
  max.outlet('eventsView', data);
  max.outlet('eventsUmenu', data);
});

socket.on('controlDump', data => {
  max.outlet('controlsView', data);
  max.outlet('controlsUmenu', data);
});


// Data from server
socket.on('control', (...incoming) => {
  max.outlet('control', incoming);
});

socket.on('event', incoming => {
  max.outlet('event', incoming);
});

socket.on('chat', incoming => {
  max.outlet('chat', incoming);
});

// --------------------


/*
socket.on('myRooms', function (data) {
  let myRooms = {
    'My Rooms': data
  }
  console.log("my rooms.....");
  console.table(myRooms);
  max.outlet(["rooms", myRooms]);
  console.log('rooms output');
});
*/