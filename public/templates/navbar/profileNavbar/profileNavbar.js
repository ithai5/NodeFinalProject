const socket = io();

triggerNotifications();

function openSidenav() {
    const nav = document.getElementById("profileNavbar");
    nav.style.width = nav.style.width === "225px" ? "0" : "225px" ; 
}

function triggerNotifications() {
    fetch("/api/users/profile").then(result => result.json())
        .then(user => {
            socket.emit('triggerNotifications', userId);
        });
}

socket.on("newNotification", roomId => {
    console.log("roomId: ", roomId);
    //When you get a new notification
    //The chat href in the UI should light up
    document.getElementById("chats").style.color = "red";
    //Potentially, it should show you which room the notification is for
});