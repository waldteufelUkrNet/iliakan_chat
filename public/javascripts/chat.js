"use strict"

const socket = io(),
      form   = document.getElementById('sendMessageForm'),
      input  = form.querySelector('input'),
      mArea  = document.querySelector('.messages-area');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    let myMessage = input.value;
    socket.emit('messageToServer', myMessage, function(data) {
      console.log("input.value", input.value);
      let message = '<span class="message message_my">' + myMessage + '</span>';
      mArea.insertAdjacentHTML('beforeEnd', message);
    });
    input.value = '';
  }
});

socket.on('messageToClient', function(msg){
  let message = '<span class="message">' + msg + '</span>';
  mArea.insertAdjacentHTML('beforeEnd', message);
});