const socket = io();

triggerNotifications();

function openSidenav() {
    const nav = document.getElementById("profileNavbar");
    nav.style.width = nav.style.width === "225px" ? "0" : "225px" ; 

}

function triggerNotifications() {
    fetch("/api/users/profile").then(result => result.json())
        .then(user => {
            if(user[0].notifications.length > 0 ){
                document.getElementById("profile").classList.add("has-notification");
                user[0].notifications.forEach(notification => {
                    
                    document.getElementById(notification.type).classList.add("has-notification");
                });
                window.history.pushState(user[0].notifications, "notification")
            }
            console.log(user[0]);
            socket.emit('triggerNotifications', user[0]);
        });
}

socket.on("newNotification", roomId => {
    console.log("roomId: ", roomId);
    //When you get a new notification
    //The chat href in the UI should light up
    document.getElementById("chats").classList.add("has-notification");
    //Potentially, it should show you which room the notification is for
});