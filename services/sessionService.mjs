import session from "express-session";
import MongoStore from "connect-mongo";

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


export { createSession };