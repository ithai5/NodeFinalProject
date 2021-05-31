const socket = io();

function sendMessage () {
  const message = document.getElementById('message-content').value;
  socket.emit('sendMessage', {message, message});
}

function joinRoom(id) {
  fetch("/api/chat/" + id).then(result => result.json()).then(result => {
    console.log(result);
    socket.emit('joinRoom', result);
  });
}

/*
function showNewMessage (content, isReceive) { //create new message
  let mainDiv = document.createElement('div')
  mainDiv.classList.add("message")
  console.log(mainDiv)
  let div = document.createElement('div')
  isReceive? div.classList.add("received-message") : div.classList.add("sent-message")
  mainDiv.append(div)
  div.append(content)
  chatBox.appendChild(mainDiv)
  //chatBox.appendChild(div)
}
*/
socket.on('messageReceived', message =>{
  console.log("messageReceived!: there is a new message for you! ", message)
  showNewMessage(message.message, true)
})

socket.on('messageSent', message => {
  console.log("MessageSent! : your message was received at the server", message)
  showNewMessage(message.message, false)
})

