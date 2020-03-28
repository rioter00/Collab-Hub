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


### 1. Node Max and NPM
![NPM](/docs/images/1-npm.png)
Our server and the client patch use [Node.JS](https://www.w3schools.com/nodejs/nodejs_events.asp). Node allows us to use any number of available code libraries as well as web connectivity. Designers can decide that their code needs a certain code library/module-- but instead of including those needed files, Node allows the end-user to use [Node Package Manager](https://www.w3schools.com/nodejs/nodejs_npm.asp) (NPM) to download need packages/modules/libraries. This does a number of good things including reducing bloat and allows users to download the needed/most up-to-date version.

It's a good idea to download the needed packages, especially the first time you're using the patch.

1. Click the button next to the '1' to run the Node Package Manager on the patch.

![npm complete](/docs/images/1-npm_complete.png)

You should see, in the Max Console, `completed` after NPM has successfully updated the modules. You can see the downloaded modules in the 'modules' folder.

---
## 2. Start Script and Connection Confirmation
This patch uses set of code written in JavaScript which interacts with Node.JS and NodeForMax. 

![node script](/docs/images/2-client_script.png)

Part of that code establishes a connection to the server. The rest of the code describes the rest of the interaction with the server, including sending/receiving data, other connected data, and Events. Click the `'Start Script'` button, which starts the client script. You should see the `[toggle] `object turn true once the connection with the server is established. 

If you double click the `[node.script CollabClient.js]` object to look at the client code. 


## 3. Check System Messages
Occasionally, the system may send relative information. Depending on your use, you might send when scheduled updates may occur/server will go down, pings, etc.

![server messages](/docs/images/3-server_message.png)

You don't manually need to do anything, at the moment.

Messages from the server are the following syntax

	serverMessage [message]

Example

	serverMessage The server will to update 3:00 AM EST. Service will be unavailable until 3:10 AM.

---
# 4. Add username
Your socket id is logged when you make your initial connection to the server. You can add your username. When you disconnect, your name will removed. All connect clients will received connected users with/without usernames.

![username](/docs/images/4-username.png)
![users](/docs/images/4-users.png)

When you send your username to the server, you use the syntax

	addUsername [username]

You can also request the list of all connected with 

	getUsers

If you request with `getUsers`, the server will send the response with a 'users' header followed by an array of Objects: 

Example
	
	users 	[
		{ 'id': [socketid], 'username': [username] },{ 	'id': [socketid], 'username': [username] },{	'id': [socketid], 'username': [username] }
	]



You can clear the array of all connect clients on the server. Please use this with caution, as this clears the user list on the server.

	clearUsers

## 5. Chat
You can chat with other connected users. You can see the textbox to type into and the message will be sent to all other users. The syntax to send a chat message is

	chat [Chat Message]

Incoming chat messages from the server follow this syntax

	chat [Chat Message]

![chat](/docs/images/5-chat.png)

## 6. Sending Data, naming headers
The heart of this tool is to be able to send data to the server, which in turn, will send to other connected clients who are interested in that data.

#### Control Data

The server can receive single values (int, float, or any number of values). 

The syntax when sending data

	control [header] 
	
Example

	control slider1 .5

#### Name your headers
Headers should describe either the type of data or the type of controller the values are representing. Sliders, Knobs, Buttons, Mouse, etc.

You can use headers using OSC-style conventions:

	control /Eric/slider1 .5
	control /1/blue/knob2 127

#### How is this stored on the server?
Control Data is stored on the server as an array of Objects with two key/value pairs:

	[
		{ 'header': [headername], 'values': [values] }, 
		{ 'header': [headername], 'values': [values] }, 
		{ 'header': [headername], 'values': [values] }
	]
	
	
![send data](/docs/images/6-send_data_events.png)

## 7. Triggering Events

Events for Collab-Hub are different from JS/Node events. I will capitalize 'Events' when referring to Collab-Hub's use. Think of Events as instantaneous occurrences, like button presses, section changes (although you could use section values too), start/stop signifiers, etc.

Events use a different but similar syntax. Events are stored on the server as an array. The array is sent to all connected clients whenever a new event is sent to the server. All events (currently) are sent to all connected clients. 

Events syntax is different from Control Data-- they don't take a value. They get sent all connected clients (for right now). The Event syntax is as follows

	event [event header]

Example 

	event button1

## 8. Requesting Data
The second most important of this server-client setup is requesting data. Outside of Events and Control Dumps, the server will not automatically send control data.

When requesting data from the server, the syntax is as follows

	getControl [headername]  

This sends a single request to the server, which will in turn only respond once. In Max, you can use a [metro] object to set a polling interval. Each requested header value can be polled at a different polling interval.

![request data](/docs/images/8-request_data.png)

## 9. Receiving Data
When receiving data, you will continue to use route (or osc-route) the requested headers. 

I'm using an additional js script to help handle incoming values (which, remember, maybe one value or multiple values). The value_handler.js also receives an alert from the server if you request a non-existent header by throwing an error message from its right outlet.

![receiving data](/docs/images/9-receiving_data.png)

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

Events are different from the JS/Node context. For the purposes of Collab-Hub, Events (capital-E) relate to instantaneous occurrences, like button presses, section changes (although you could use section values too), start/stop signifiers, etc.

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

 

