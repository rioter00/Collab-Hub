// --------------------------------------------------------------------------
// This is the javascript required for interactive data retrieval from
// the Max-based SocketIO (client).
// --------------------------------------------------------------------------
/* global $ */

const io = require('socket.io-client');
const http = require('http');
const maxAPI = require("max-api");
// const socket = io.connect('http://MoxSonicApp.herokuapp.com/');
// const socket = io.connect('http://127.0.0.1/');
const socket = io.connect('http://Covid-Collab.herokuapp.com/');
// const socket = io.connect('https://noderemoteworkshop.herokuapp.com/');
socket.on('connect', () => {
	maxAPI.outlet("connected");
});


// events
maxAPI.addHandler('control', (head, ...vals) => {
	const newControl = {header: head, values: vals};
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

socket.on('users', function (data){
	console.log('lists of users: ' + data);
	// maxAPI.outlet(["users", ...data]);
	maxAPI.outlet(["users", data]);
});

// // Add a connect listener 'connectionEstabilished' id: socket
// socket.on('connected', function (data) {
//   console.log('new connection-max');
//   maxAPI.outlet(["connected", data.id]);
// });
//
// // Add a connect listener 'connectionEstabilished' id: socket
// socket.on('connect', function (data) {
//   console.log('new connection-max');
//   maxAPI.outlet(["connected", data.id]);
// });

// // Add a connect listener 'connectionEstabilished' id: socket
// socket.on('connectionEstabilished-max', function (data) {
//   console.log('new connection-max');
//   maxAPI.outlet(["connected", data.id]);
// });
//
// socket.on('connectionEstabilishedGlobal', function (data) {
//   console.log('new connectionGlobal');
//   maxAPI.outlet(["connected", data.id]);
// });

socket.on('control', function (head, vals) {
  console.log('control ' + head + " " + vals);
	// use spread operator regardless if single or multiple datum.
  maxAPI.outlet(["control", head, ...vals]);
});

socket.on('controlDump', function (obj) {
  console.log('controlDump ' + obj);
//let newDict = {head k
  //maxAPI.outlet(["control", head + " " + vals]);
  maxAPI.outlet(["controlDump", obj]);
});


console.log("ready to roq");
