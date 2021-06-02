import express from 'express'
import chatServiceMjs from '../services/chatService.mjs';

const chatService = chatServiceMjs;
const routerChats = express.Router()

routerChats.get("/api/chat/:id", (req, res) => {
    const senderId = req.session.userId;
    const receieverId = req.params.id;
    chatService.getRoom(senderId, receieverId).then( result => {
        res.send(result);
    });
});

//Post instead of patch, because we're storing new info
routerChats.post("/api/chat/:roomId", (req, res) => {
    chatService.saveMessage(req.params.roomId, req.body.message, req.session.userId).then(result => {
            res.send(result);
        });
});

export default routerChats;