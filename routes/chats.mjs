import express from 'express'
import chatServiceMjs from '../services/chatService.mjs';

const chatService = chatServiceMjs;
const routerChats = express.Router();

routerChats.all("/api/chats/*", (req, res, next) => { //you need to be a login user and have a store cookie to use this api
    if (!req.session.userId) { 
        res.sendStatus(401)
    }
    else {
        next();
    }
})

routerChats.get("/api/chats/:recieverId", (req, res) => {
    const senderId = req.session.userId;
    const receieverId = req.params.recieverId;
    chatService.getRoom(senderId, receieverId).then( result => {
        res.send(result);
    });
});

//Post instead of patch, because we're storing new info
routerChats.post("/api/chats/:roomId", (req, res) => {
    chatService.saveMessage(req.params.roomId, req.body.message, req.session.userId).then(result => {
        res.send(result);
    });
});

routerChats.get("/api/chats", (req, res) => {
    chatService.getRooms(req.session.userId).then(result => {
        res.send({chats: result, userId : req.session.userId})
        });
});

export default routerChats;