import { prisma } from './dbService.js'

export function createRoom(senderId, receiverId) {
    return prisma.chats.create({
        data: { users: [senderId, receiverId], chatLog: [] },
    })
}

export function getRoom(senderId, receiverId) {
    return prisma.chats.findFirst({
        where: { users: { hasEvery: [senderId, receiverId] } },
    })
}

export function getRoomsOfUser(userId) {
    console.log(userId)
    return prisma.chats.findMany({
        where: { users: { has: userId } },
    })
}

export function addMessage(roomId, messageToSave) {
    return prisma.chats.update({
        where: {
            id: roomId,
        },
        data: {
            chatLog: { push: [messageToSave] },
        },
    })
}
