let room
let receiverId = window.location.pathname.split('/chats/')[1]
joinRoom()

let chatBox = document.getElementById('chat-messages')

function sendMessage() {
    const message = document.getElementById('message-content').value
    if (message.length === 0) {
        return
    }
    socket.emit('sendMessage', room, message, receiverId)
    $.post('/api/chats/' + room.id, { message })
    $.post('/api/users/notifications', {
        roomId: room.id,
        type: 'chats',
        receiverId: receiverId,
    })
    //Clear input field when message is sent,
    //Allow message to be sent by hitting enter key
    document.getElementById('message-content').value = ''
}

function joinRoom() {
    fetch('/api/chats/' + receiverId)
        .then((result) => result.json())
        .then((result) => {
            room = result
            //delete notification from sessionUser
            $.ajax({
                url: '/api/users/notifications',
                type: 'PUT',
                data: {
                    roomId: room.id,
                    type: 'chats',
                },
            })
            socket.emit('joinRoom', room)
            showChatLog()
        })
}

function showChatLog() {
    //load messages for chatlog
    const chatLog = room.chatLog
    chatLog.forEach((element) => {
        showNewMessage(element.message, element.user === receiverId)
    })
}

function showNewMessage(content, isReceived) {
    //create new message
    let mainDiv = document.createElement('div')
    mainDiv.classList.add('message')
    let div = document.createElement('div')
    isReceived
        ? div.classList.add('received-message')
        : div.classList.add('sent-message')
    mainDiv.append(div)
    div.append(content)
    chatBox.appendChild(mainDiv)
}

socket.on('messageReceived', (message) => {
    //get trigered by the socket .emit
    showNewMessage(message, true)
})

socket.on('messageSent', (message) => {
    //get trigered by the socket .emit
    showNewMessage(message, false)
})
