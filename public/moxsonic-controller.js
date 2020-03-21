
  // messages
  $(function() { // called when DOM is ready

    // establishes a socket.io connection
    var socket = io();

    // interface functions
    $('#shootbutton1').click(function() {
      socket.emit('control', 'slider1', '12');
      console.log("control slider1 12");
      return false; // false does not reload the page
    });

    $('#inc-button1').click(function() {
      socket.emit('control', {'header': 'slider1', 'values': 12});
      console.log("control slider1 12");
      return false; // false does not reload the page
    });

    $('#inc-button2').click(function() {
      socket.emit('clearUsers');
      console.log("increaseP2");
      return false; // false does not reload the page
    });

    $('#inc-button3').click(function() {
      socket.emit('inc', '3');
      console.log("increaseP3");
      return false; // false does not reload the page
    });

    $('#inc-button4').click(function() {
      socket.emit('inc', '4');
      console.log("increaseP4");
      return false; // false does not reload the page
    });

    $('#dec-button1').click(function() {
      socket.emit('dec', '1');
      console.log("decreaseP1");
      return false; // false does not reload the page
    });

    $('#dec-button2').click(function() {
      socket.emit('dec', '2');
      console.log("decreaseP2");
      return false; // false does not reload the page
    });

    $('#dec-button3').click(function() {
      socket.emit('dec', '3');
      console.log("decreaseP3");
      return false; // false does not reload the page
    });

    $('#dec-button4').click(function() {
      socket.emit('dec', '4');
      console.log("decreaseP4");
      return false; // false does not reload the page
    });

    $('#collectible-button').click(function() {
      socket.emit('spawnCollectible');
      console.log("spawning collectible");
      return false; // false does not reload the page
    });


    $('#dec-tempo').click(function() {
      socket.emit('decreaseTempo', socket.id);
      console.log("decreasing Tempo");
      return false; // false does not reload the page
    });

    $('#inc-tempo').click(function() {
      socket.emit('increaseTempo', socket.id);
      console.log("increasing Tempo");
      return false; // false does not reload the page
    });
});
