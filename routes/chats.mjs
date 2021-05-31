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

export default routerChats;