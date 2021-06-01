const socket = io();
let room;
let receiverId = window.location.pathname.split('/chats/')[1];
joinRoom()

let chatBox = document.getElementById("chat-messages");

function sendMessage () {
  const message = document.getElementById('message-content').value;
  if(message.length === 0 ){
    return;
  }
  socket.emit('sendMessage', room, message);
  $.post(("/api/chat/" + room._id), {message});
}

function joinRoom() {
  fetch("/api/chat/" + receiverId).then(result => result.json()).then(result => {
    room = result;
    socket.emit('joinRoom', room);
    showChatLog();
  });
}

function showChatLog() {
  const chatLog = room.chatLog;
  chatLog.forEach(element => {
    showNewMessage(element.message, (element.user === receiverId))
  });
}


function showNewMessage (content, isReceived) { //create new message
  let mainDiv = document.createElement('div')
  mainDiv.classList.add("message")
  let div = document.createElement('div')
  isReceived? div.classList.add("received-message") : div.classList.add("sent-message")
  mainDiv.append(div)
  div.append(content)
  chatBox.appendChild(mainDiv)
}

socket.on('messageReceived', message =>{
  console.log("messageReceived!: there is a new message for you! ", message)
  showNewMessage(message, true)
})

socket.on('messageSent', message => {
  console.log("MessageSent! : your message was received at the server", message)
  showNewMessage(message, false)
})

