const socket = io();
let room;
let receiverId;

let chatBox = document.getElementById("chat-box");

function sendMessage () {
  const message = document.getElementById('message-content').value;
  socket.emit('sendMessage', room, message);
}

function joinRoom(id) {
  fetch("/api/chat/" + id).then(result => result.json()).then(result => {
    room = result;
    receiverId = id;
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

