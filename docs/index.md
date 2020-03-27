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

Connection to the server through socket.io happens automatically. Each client is registered, and an array of all connected clients (by socket id) is sent to all other connected clients, with an event `'users'`.

### Data
Server accepts most data-related messages in a <command> <header> <value> syntax.


#### Available Commands/Events:
Commands sent to server are wrapped in Node.JS event system. Here are a couple useful links: [https://www.w3schools.com/nodejs/nodejs_events.asp](https://www.w3schools.com/nodejs/nodejs_events.asp)


**Send Control Data**

	control [headername] [value1] ([value2] etc...)
	
Example: 

	control slider1 .5

JS Example: 

	socket.emit('control', {'header': slider1, 'values': .5});

> The size of the values set is can be one or more. More information on requesting/receiving data later in the section.

> Headers can formatted with OSC style slashing.

Examples: 

	control nick/slider1 .5
	control nick/multislider1 .2 0 .8 1.0 .13

Some things happen when new control headers arrive at the server. The server...

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
	
JS Example: 

	socket.emit('getControl', 'slider1');

---

### 'Events'

Events are different than the JS/Node context. For the purposes of Collab-Hub, (capital-E) Events relate to instantaneous occurrences, like button presses, section changes (although you could use section values too), start/stop signifiers, etc.

Events use a different but similar syntax. Events are stored on the server as an array. The array is sent to all connected clients whenever a new event is sent to the server. All events (currently) are sent to all connected clients. 

#### Send an Event to the server
Syntax

	event [header]

Example

	event button1

JS Example

	socket.emit('event', 'button1');


#### Receive/Listen for an event from the server
*You cannot request an event. You just have to be listening for an event. The syntax is similar to send an Event.*

Syntax

	event [header]

Example

	event button1

JS Example 

	socket.on('event', (header) => {
		if(header == 'button1'){
			// do something
		}
	});

--- 
### User Related Data
When a new user connects, they are automatically added to a 'users' array. The users array holds clients' socket ids. Disconnected users are removed. 

New clients are automatically sent a list of all connected users. 

#### Receive/Listen for user list

Listen for 'users' event and accept an array of Objects `{id: [id], username: [username]}`.

JS Example

	socket.on('users', (usersArray) => {
		for(let user of usersArray){
			if(user.username != ''){
				console.log(user.username);
			} else {
				console.log(user.id);
			}
		}
	});


#### Update your user information with your name
Users can add a name to their id. The server will match your socket id within the users array and add a value to the 'username' id. 

Event/Command syntax

	addUsername [username]

Example

	addUsername TonyToneT

JS Example

	  socket.emit('addUsername', 'TonyToneT');

 

