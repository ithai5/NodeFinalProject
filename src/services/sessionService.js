import session from 'express-session'
import MongoStore from 'connect-mongo'
import * as dotenv from 'dotenv'

dotenv.config()

function createSession() {
    return session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, //1000mil * 60 seconds * 60 minutes * 24 hours * 7 days
        store: MongoStore.create({
            mongoUrl: process.env.DB_CONNECTION,
            dbName: 'NodeExam',
            collectionName: 'session',
        }),
    })
}

export { createSession }
