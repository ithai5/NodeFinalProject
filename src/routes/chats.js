import express from 'express'
import { findRoom, getRooms, saveMessage } from '../services/chatService.js'

const routerChats = express.Router()

routerChats.all('/api/chats/*', (req, res, next) => {
    //you need to be a login user and have a store cookie to use this api
    if (!req.session.userId) {
        res.sendStatus(401)
    } else {
        next()
    }
})

routerChats.get('/api/chats/:receiverId', (req, res) => {
    const senderId = req.session.userId
    const receiverId = req.params.receiverId
    findRoom(senderId, receiverId).then((result) => {
        res.send(result)
    })
})

//Post instead of patch, because we're storing new info
routerChats.post('/api/chats/:roomId', (req, res) => {
    saveMessage(req.params.roomId, req.body.message, req.session.userId).then(
        (result) => {
            res.send(result)
        }
    )
})

routerChats.get('/api/chats', (req, res) => {
    getRooms(req.session.userId).then((result) => {
        res.send({ chats: result, userId: req.session.userId })
    })
})

export default routerChats
