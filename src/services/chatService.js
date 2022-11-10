import {
    addMessage,
    createRoom,
    getRoom,
    getRoomsOfUser,
} from '../repository/chatRepository.js'

//METHODS

function findRoom(senderId, receiverId) {
    return getRoom(senderId, receiverId).then((result) => {
        //Check if the room exists, and create a new one if it doesn't
        if (result) {
            return createRoom(senderId, receiverId)
        } else {
            //PromiseGet returns an array, but we're
            //only looking for a single room
            return result
        }
    })
}

function getRooms(userId) {
    return getRoomsOfUser(userId).then((result) => {
        return result
    })
}
function saveMessage(roomId, messageContent, senderId) {
    const messageToSave = {
        user: senderId,
        message: messageContent,
        timeStamp: new Date(),
    }
    return addMessage(roomId, messageToSave)
}

export { findRoom, createRoom, saveMessage, getRooms }
