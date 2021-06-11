chatList = document.getElementById("chatList");
fetch("/api/users/profile").then(result => result.json()).then(currentUser => {  
    currentUser = currentUser.user
    roomsNotifications = currentUser.notifications.map(room => room.room); //getting the user rooms with notifications
    fetch("/api/chats").then(results => results.json()).then(chats => {
        chats.chats.forEach(chat => {
            const recipientId = chat.users.filter(user => user !== chats.userId)[0]; //to get the name of the user that the sessionUser chats with 
            fetch("/api/users/" + recipientId ).then(results => results.json()).then(user => {
                user = user.user
                const recipient = createDivTag("a", "recipient", user.firstName + " " + user.lastName); //creating div element and a tag with the link to the chat page
                if (roomsNotifications.includes(chat._id)){
                    //recipient.classList.add("has-notification"); //if notificaion and room has the same id 
                    const notification =  createDivTag("span", "notification-mark", "")
                    recipient.appendChild(notification)
                }
                recipient.href = "/chats/" + recipientId;
                const chatDiv = createDivTag("div", "chat", "")
                
                chatDiv.appendChild(recipient)
                chatList.appendChild(chatDiv);
            });
        });
    });
});


function createDivTag(tag, className, content) {
    const divTag = document.createElement(tag);
    divTag.classList.add(className);
    divTag.innerText = content;
    return divTag;
}
  