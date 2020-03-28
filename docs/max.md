1. [About Collab-Hub](index.md)
2. [Basic API](api.md)
3. [Using Max with Collab-Hub](max.md)

# Using Max with Collab-Hub

## Connection:

Server is located at [https://remote-collab.herokuapp.com](https://remote-collab.herokuapp.com)

Connection to the server through socket.io happens automatically. Each client is registered, and an array of all connected clients (by socket id) is sent to all other connected clients, with an event `'users'`. The client patch uses [Node for Max](https://docs.cycling74.com/nodeformax/api/) and JavaScript.

The Max Client patch is called 'Collab Client' in the [source package](https://github.com/rioter00/Collab-Hub). The Collab Client patch uses vanilla Max objects. 

# The Anatomy of the Patch
1. Node for Max and NPM
2. Start Script and Connection Confirmation
3. Check System Messages
4. Add username
5. Chat
6. Sending Data, naming headers
7. Trigger Events
8. Requesting Data
9. Receiving Data
10. Data Dumps


### Node Max and NPM
![images/1 - NPM.png](NPM)


## Data
Server accepts most data-related messages in a <command> <header> <value> syntax.


### Available Commands/Events:
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

Events are different than the JS/Node context. For the purposes of Collab-Hub, Events (capital-E) relate to instantaneous occurrences, like button presses, section changes (although you could use section values too), start/stop signifiers, etc.

Events use a different but similar syntax. Events are stored on the server as an array. The array is sent to all connected clients whenever a new event is sent to the server. All events (currently) are sent to all connected clients. 

#### Send an Event to the server
Syntax

	event [header]

Example

	event button1

JS Example

	socket.emit('event', 'button1');



#### Receive/Listen for an event from the server
*You cannot request an event. You just have to be listening for an event. The syntax is similar to sending an Event.*

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

Listen for 'users' event and accept an [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects) array `{id: [id], username: [username]}`.

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


#### Update your user information with a username
Users can add a name to their id. The server will match your socket id within the users array and add a value to the 'username' id. 

Event/Command syntax

	addUsername [username]

Example

	addUsername TonyToneT

JS Example

	socket.emit('addUsername', 'TonyToneT');

 

