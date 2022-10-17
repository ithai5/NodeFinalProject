import { promiseGet, promiseCreate, promiseUpdate } from './dbService.js'
import passwordManagement from '../passwordManagement.js'
import mongodb from 'mongodb'

const USERS = 'users'

async function userValidation(query) {
    //send db query to get user hashed password in return
    const user = await promiseGet(USERS, { email: query.email })
    if (user.length === 0) {
        return false
    }
    //compare the query password with the hashed db password
    return passwordManagement.compareHash(query.password, user[0].password)
        ? user
        : false
}

async function signUp(signUpInfo) {
    let isCreated = false
    await promiseGet(USERS, { email: signUpInfo.email }).then(async (users) => {
        if (users.length === 0) {
            //checks if there is no user with this mail in the db
            signUpInfo.password = await passwordManagement.passwordToHash(
                signUpInfo.password
            )
            signUpInfo.notifications = []
            promiseCreate(USERS, signUpInfo)
            isCreated = true
        }
    })
    return isCreated
}

function getUsers(query) {
    if (typeof query === 'string') {
        query = { _id: mongodb.ObjectID(query + '') }
    }
    return promiseGet(USERS, query)
}

function saveNotification(roomId, type, userId) {
    const newNotification = {
        room: roomId,
        type: type,
    }
    return promiseUpdate(
        USERS,
        userId,
        { notifications: newNotification },
        'push'
    )
}

function deleteNotification(roomId, type, userId) {
    const notificaionToDelete = {
        room: roomId,
        type: type,
    }
    return promiseUpdate(
        USERS,
        userId,
        { notifications: notificaionToDelete },
        'pull'
    )
}

function approveEmailAddress(userId) {
    return promiseUpdate(USERS, userId, { status: 'approve' }, 'set')
}

export default {
    userValidation,
    signUp,
    getUsers,
    saveNotification,
    deleteNotification,
    approveEmailAddress,
}
