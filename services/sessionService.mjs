import session from "express-session";
import MongoStore from "connect-mongo";
import mongodb from "mongodb";
import { promiseGet } from "./dbService.mjs";

const SESSIONS = "sessions";

function createSession() {
    return session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
        store: MongoStore.create({ mongoUrl: process.env.DB_CONNECTION, dbName: "NodeExam", collection: "session" })
    });
}

async function getSession(sessionID) {
    const query = { _id : sessionID };
    return await promiseGet(SESSIONS, query);
}

async function verifySession(sessionID) {
    return await getSession(sessionID).then((result) => {
        return result.length === 1;
    });
}

export { createSession, getSession, verifySession };