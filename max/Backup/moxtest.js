var url = 'http://Remote-Collab.herokuapp.com:19795';
console.log('Connecting to ' + url);
var io = require('socket.io-client');
var socket = io.connect(url, { transports: ['websocket'], secure: false, reconnection: true, rejectUnauthorized: false });
socket.on('connect_error', function(error){ console.log('Error connecting to ' + url, error);});
socket.on('connect', function() {
    console.log('Connected to ' + url);
});


var https = require('https');
var options = { host: 'http://Remote-Collab.herokuapp.com',
    port: '19795',
    path: '/socket.io/?EIO=3&transport=polling&t=1404103832354-0&b64=1',
    method: 'GET',
    headers:
    { 'User-Agent': 'node-XMLHttpRequest',
    Accept: '*/*',
    Host: 'http://Remote-Collab.herokuapp.co:19795' },
    agent: false
};
https.globalAgent.options.rejectUnauthorized = false;
https.request(options, function() {
    console.log(arguments);
    throw 'done';
});