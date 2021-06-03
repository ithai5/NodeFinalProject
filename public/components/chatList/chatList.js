chatList = document.getElementById("chatList");

fetch("/api/chats").then(results => results.json()).then(chats => {
    chats.chats.forEach(chat => {
        recipientId = chat.users.filter(user => user !== chats.userId)[0];
        fetch("/api/users/" + recipientId ).then(results => results.json()).then(user => {
            const recipient = createDivTag("a", "recipient", user[0].firstName + " " + user[0].lastName);
            recipient.href = "/chats/" + recipientId;
            chatList.appendChild(recipient);
        });
    });
    //need to be some nicer way to get the user name
});


function createDivTag(tag, className, content) {
    const divTag = document.createElement(tag);
    divTag.classList.add(className);
    divTag.innerText = content;
    return divTag;
}
  