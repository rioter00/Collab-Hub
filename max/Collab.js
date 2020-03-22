// --------------------------------------------------------------------------
// This is the javascript required for interactive data retrieval from
// the Max-based SocketIO (client).
// --------------------------------------------------------------------------
/* global $ */

// const io = require('socket.io-client');
// // const http = require('http');
// const maxAPI = require("max-api");
// // const socket = io.connect('http://MoxSonicApp.herokuapp.com/');
// // const socket = io.connect('http://127.0.0.1/');
// // const socket = io.connect('http://Covid-Collab.herokuapp.com/');
// // const socket = io.connect('https://noderemoteworkshop.herokuapp.com/');

const maxAPI = require('max-api'),
  io = require('socket.io-client'),
  socket = io.connect('http://remote-collab.herokuapp.com/');

socket.on('connect', () => {
      maxAPI.outlet("Connected to server");
    });


		socket.on('connect', () => {
		  maxAPI.outlet("connected");
		});

		// events

    socket.on('connectionEstablishedGlobal', (data) => {
      console.log("SERVER");
    })

		maxAPI.addHandler('control', (head, ...vals) => {
		  const newControl = {
		    header: head,
		    values: vals
		  };
		  console.log(newControl);
		  socket.emit('control', newControl);
		  console.log('sending control: ' + head + " - " + vals);
		});

    maxAPI.addHandler('clearControls', ()=>{
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
		  console.log('getUsers called');
		});

		maxAPI.addHandler('clearUsers', () => {
		  socket.emit('clearUsers');
		  console.log('clearUsers called');
		});

    socket.on('serverMessage', ()=> {
      console.log('Message from Server: ');
      maxAPI.outlet(["serverMessage", "yes"]);
    })

    socket.on('serverMessage', function(data) {
      console.log('Message from Server: ' + data);
      maxAPI.outlet(["serverMessage", data]);
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
