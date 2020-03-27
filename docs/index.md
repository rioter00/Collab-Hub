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
## BASIC API

### Connection:

Server is located at [https://remote-collab.herokuapp.com](https://remote-collab.herokuapp.com)

Connection to the server through socket.io happens automatically. Each client is registered and array of all connected clients (by socket id) are sent to all other connected clients, with a header `'users'`.

### Send Data
Server accepts most data-related messages in a <command> <header> <value> syntax.


#### Available Commands:
Send Control Data

	control [headername] [value1] ([value2] etc...)

	Example: control slider1 .5

The size of the values set is can be one or more. More information on requesting/receiving data later in the section.

Headers can formatted with OSC style slashing.

	Example: control nick/slider1 .5

*Some things happen when new control headers arrive at the server. 
- The server registers the new header. 
- Sends a JSON Object of the entire list of available headers and the latest set of values to connected clients*
	


