import {promiseGet, promiseCreate, promiseUpdate, promiseDelete} from "./dbService.mjs";
import mongodb from "mongodb";



const CHATS = "chats";
//METHODS

async function getRoom(senderId, receiverId) {
    const query = { users: { $all:[senderId, receiverId] } };

    return await (promiseGet(CHATS, query)).then((result) => {
        //Check if the room exists, and create a new one if it doesn't
        if (result.length === 0) {
            return createRoom(senderId, receiverId);
        } else {
            //PromiseGet returns an array, but we're
            //only looking for a single room
            return result[0];
        }
    });
};

async function createRoom(senderId, receiverId) {
    const query = {
        chatLog: [],
        users: [senderId, receiverId],
    };
    
    //Create room, and then return the created room
    return await promiseCreate(CHATS, query).then(() => {
        return getRoom(senderId, receiverId);
    });
} 

export default {getRoom, createRoom};