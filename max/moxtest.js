// --------------------------------------------------------------------------
// This is the javascript required for interactive data retrieval from
// the Max-based SocketIO (client).
// --------------------------------------------------------------------------
/* global $ */

const io = require('socket.io-client');
const http = require('http');
const maxAPI = require("max-api");
// const socket = io.connect('http://MoxSonicApp.herokuapp.com/');
// const socket = io.connect('http://Covid-Collab.herokuapp.com/');
const socket = io.connect('http://127.0.0.1/');
// const socket = io.connect('http://angle-shooter.herokuapp.com/');

// Add a connect listener 'connectionEstabilished' id: socket
socket.on('connectionEstabilished-max', function (data) {
  console.log('new connection-max');
  maxAPI.outlet(["connected", data.id]);
});

socket.on('connectionEstabilishedGlobal', function (data) {
  console.log('new connectionGlobal');
  maxAPI.outlet(["connected", data.id]);
});

socket.on('inc', function (data) {
  console.log('inc ' + data);
  maxAPI.outlet(["inc", data]);
});

socket.on('dec', function (data) {
  console.log('dec ' + data);
  maxAPI.outlet(["dec", data]);
});

//


socket.on('decreaseTempo', function (data) {
  console.log('decreaseTempo');
  maxAPI.outlet(["tempo", "up"]);
});

socket.on('increaseTempo', function (data) {
  console.log('increaseTempo');
  maxAPI.outlet(["tempo", "down"]);
});

//

socket.on('spawnCollectible', function() {
  console.log('spawnCollectible');
  maxAPI.outlet(['spawnCollectible']);
});

console.log("ready to roq");
