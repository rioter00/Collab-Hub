![logo](/docs/images/Collab-Hub.png)

1. [About Collab-Hub](index.md)
2. [Basic API](api.md)
3. [Using Max with Collab-Hub](max.md)
4. [Web Pages as Client](web-client.md)

---
# Welcome to Collab-Hub
### A new update is on the horizon! Looking for an updated API, client templates, and examples of connecting other devices and platforms!
Collab-Hub is a server-based tool meant for remote/telematic musical performance.

Source: [https://github.com/rioter00/Collab-Hub](https://github.com/rioter00/Collab-Hub)

Authors: Nick Hwang ([nickthwang@gmail.com](nickthwang@gmail.com)), Eric Sheffield, Tony Marasco

Stay up to date: [Join Our Newsletter](http://eepurl.com/humnhn)

---
The purpose of Collab-Hub is allow for multiple users (musicians, artists, hackers) to send data easily and remotely so they can collaborate with that data. 

Beyond remote collaboration, Collab-Hub can also be used in other contexts regardless of locality. You can add 'multi-' in front of each of these, as possible the scale of each is increased: laptop orchestra, multi-channel speaker array, video games, net art, multi-site art installation, internet of things, video art (we're sending some small matrices), etc.

Our hope is that people will use this tool for artistic collaboration. And I will be able to work with other people (near and far) to enable them to do cool things, together.

---
Note: The client examples currently are for [Cycling74](https://cycling74.com)'s Max and Web Interface.
The current instance of the server is meant for public use. If you would like to work with me on a more specific and private use, please contact me. 

---
What does the Server do?

- Receives control data and  sends out control data upon request.
- Receives and sends event occurrences (think a button press)
- Maintains record of connected clients (server uses socket.io).

---
Before we move forward, I start by talking about the underlying command structure, syntax, JavaScript, [Node.JS](https://nodejs.org/), [socket.io](https://socket.io) nitty gritty, but if you are here for the the [Max](https://cycling74.com) and/or web portions of this, you will not have to understand all/any of this. 

You can skip ahead to the Max portion, if you wish. :-)
 
1. [About Collab-Hub](index.md)
2. [Basic API](api.md)
3. [Using Max with Collab-Hub](max.md)
4. [Web Pages as Client](web-client.md)


