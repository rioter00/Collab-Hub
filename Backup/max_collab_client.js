// --------------------------------------------------------------------------
// This is the javascript required for interactive data retrieval from
// the Max-based SocketIO (client).
// --------------------------------------------------------------------------
/* global $ */

const io = require('socket.io-client');
const http = require('http');
const maxAPI = require("max-api");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// const socket = io.connect('ws://remote-collab.herokuapp.com/socket.io/?EIO=4&transport=websocket');
// const socket = io.connect('http://127.0.0.1/');
// let socket = io.connect("http://localhost:3000");
// const socket = io.connect('http://MoxSonicApp.herokuapp.com/');
// const socket = io.connect('http://Remote-Collab.herokuapp.com/:19795', { transports: ['websocket'], secure: false, reconnection: true, rejectUnauthorized: false });
// const socket = io.connect('https://noderemoteworkshop.herokuapp.com/');




socket.on('connect', () => {
  maxAPI.outlet("connected");
});

// events

socket.on('inc', function(data) {
  console.log('inc ' + data);
  maxAPI.outlet(["inc", data]);
});

maxAPI.addHandler('control', (head, ...vals) => {
  const newControl = {
    header: head,
    values: vals
  };
  console.log(newControl);
  socket.emit('control', newControl);
  console.log('sending control: ' + head + " - " + vals);
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
  console.log('getUsers called');
});

maxAPI.addHandler('clearUsers', () => {
  socket.emit('clearUsers');
  console.log('clearUsers called');
});

socket.on('users', function(data) {
  console.log('lists of users: ' + data);
  // maxAPI.outlet(["users", ...data]);
  maxAPI.outlet(["users", data]);
});

socket.on('event', function(header) {
  maxAPI.outlet(["event", header]);
});

socket.on('control', function(head, vals) {
  console.log('control ' + head + " " + vals);
  // use spread operator regardless if single or multiple datum.
  console.log('val length: ' + vals);
  if (vals == null || vals == 'undefined') {
    console.log('header undefined');
    maxAPI.outlet(["control", head, "noHeader"]);
  } else {
    maxAPI.outlet(["control", head, ...vals]);
  }
});

socket.on('controlDump', function(obj) {
  console.log('controlDump ' + obj);
  //let newDict = {head k
  //maxAPI.outlet(["control", head + " " + vals]);
  maxAPI.outlet(["controlDump", obj]);
});
