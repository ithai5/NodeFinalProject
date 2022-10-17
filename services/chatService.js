import { promiseGet, promiseCreate, promiseUpdate } from './dbService.js'

const CHATS = 'chats'

//METHODS

function getRoom(senderId, receiverId) {
    const query = { users: { $all: [senderId, receiverId] } }

    return promiseGet(CHATS, query).then((result) => {
        //Check if the room exists, and create a new one if it doesn't
        if (result.length === 0) {
            return createRoom(senderId, receiverId)
        } else {
            //PromiseGet returns an array, but we're
            //only looking for a single room
            return result[0]
        }
    })
}

function getRooms(userId) {
    const query = { users: userId }
    return promiseGet(CHATS, query).then((result) => {
        return result
    })
}

function createRoom(senderId, receiverId) {
    const query = {
        chatLog: [],
        users: [senderId, receiverId],
    }

    //Create room, and then return the created room
    return promiseCreate(CHATS, query).then(() => {
        return getRoom(senderId, receiverId)
    })
}

function saveMessage(roomId, messageContent, senderId) {
    const messageToSave = {
        user: senderId,
        message: messageContent,
        timeStamp: new Date(),
    }
    return promiseUpdate(CHATS, roomId, { chatLog: messageToSave }, 'push')
}

export default { getRoom, createRoom, saveMessage, getRooms }
