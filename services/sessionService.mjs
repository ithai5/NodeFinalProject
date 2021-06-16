import session from "express-session";
import MongoStore from "connect-mongo";

const SESSIONS = "sessions";

function createSession() {
    return session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 1000*60*60*24*7 }, //1000mil * 60 seconds * 60 minuts * 24 hours * 7 days 
        store: MongoStore.create({ mongoUrl: process.env.DB_CONNECTION, dbName: "NodeExam", collection: "session" })
    });
}


export { createSession };