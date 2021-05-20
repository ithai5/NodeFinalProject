import express from 'express';
import userService from "../services/userService.mjs";
import session from "express-session";
import MongoStore from "connect-mongo";

const routerUser = express.Router()


// routerUser.get("/login", (req, res) => {
//     res.send({messages: "test"});
// })


routerUser.post("/api/login", async (req, res) => {
    const loginInfo = {... req.body};
    if (await userService.getUser(loginInfo)) {
        //the cookie is provided only if login succeeds
        routerUser.use(session({
            secret: process.env.SECRET,
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false },
            store: MongoStore.create({ mongoUrl: process.env.DB_CONNECTION, dbName: "NodeExam", collection: "session" })
          }))

        res.send({ message: "login success" });
    }
    else {
        res.send({ message: "login failed" });
    }
    
    //condition needs to be connected to the database
        //Send back a cookie and expiration,
        //Something identifying the logged in user (id?)
    
});

routerUser.post("/api/signup", async (req, res) => {
    const signUpInfo = {... req.body};
    userService.signUp(signUpInfo).then(result => {
        res.send(result);
    });
});

export default routerUser;