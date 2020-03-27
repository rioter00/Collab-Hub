# Welcome to Collab-Hub
Collab-Hub is a server-based data server meant for remote/telematic musical performance.

Source: [https://github.com/rioter00/Collab-Hub](https://github.com/rioter00/Collab-Hub)

Authors: Nick Hwang (nickthwang@gmail.com)
Support: Eric Sheffield, Tony Marasco


{{TOC}}

---
Note: The client examples currently are for Cycling74's Max and Web Interface.
The current instance of the server is meant for public use. If you would like to work with me on more specific and private use, please contact me. 

What does the Server do?

- Receives control data and  sends out control data upon request.
- Receives and sends event occurrences (think a button press)
- Maintains record of connected clients (server uses socket.io).

---
Before we move forward, I start by talking about the underlying command structure, syntax, JS, Node.JS, socket.io nitty gritty, but if you are here for the the MaxMSP and/or web portions of this, you will not have to understand all/any of this. 

You can skip ahead to the Max portion, if you wish. :-)

---
## BASIC API

### Connection:

Server is located at [https://remote-collab.herokuapp.com](https://remote-collab.herokuapp.com)

Connection to the server through socket.io happens automatically. Each client is registered and array of all connected clients (by socket id) are sent to all other connected clients, with a header `'users'`.

### Send Data
Server accepts most data-related messages in a <command> <header> <value> syntax.


#### Available Commands/Events:
Commands sent to server are wrapped in Node.JS event system. Here are a couple useful links: [https://www.w3schools.com/nodejs/nodejs_events.asp](https://www.w3schools.com/nodejs/nodejs_events.asp)


**Send Control Data**

	control [headername] [value1] ([value2] etc...)
	Example: control slider1 .5
	JS Example: 
	socket.emit('control', {'header': slider1, 'values': .5});

> The size of the values set is can be one or more. More information on requesting/receiving data later in the section.

> Headers can formatted with OSC style slashing.

	Example: control nick/slider1 .5
	Example2: control nick/multislider1 .2 0 .8 1.0 .13

Some things happen when new control headers arrive at the server...

- Registers the new header
- Sends a JSON Object of the entire list of available headers and the latest set of values to connected clients, with `'controlDump'` event.

**Receive Control Data**

There are two main steps to receive data from server.

1. Request a specific header with the 'getControl' command.
2. Your client must have an event handler for a `'control'` event, looking for a key of 'values'.

Syntax:

	getControl [header]

Examples:

	getControl slider1
	
	JS Example: socket.emit('getControl', 'slider1');

	


