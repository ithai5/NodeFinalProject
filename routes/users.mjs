import express from 'express';
import userService from "../services/userService.mjs";
import { verifySession } from "../services/sessionService.mjs";

const routerUser = express.Router()

routerUser.post("/api/login", async (req, res) => {
    const loginInfo = {... req.body};
    if (await userService.getUser(loginInfo)) {
        //the cookie is provided only if login succeed
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
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    let checks = [
        signUpInfo.firstName.length>1, signUpInfo.lastName.length>1, 
        emailRegex.test(signUpInfo.email), signUpInfo.password.length > 7
    ]
    if(!checks.includes(false)){
        userService.signUp(signUpInfo).then(result => {
            res.send(result);
        });    
    }
    else{
        res.send({message: "failed to sign-up"})
    }
});


routerUser.get("/api/users", (req, res) => {
    userService.getUsers().then(result => {
        res.send(result);
    });
})

routerUser.get("/api/verify", (req, res) => {
    verifySession(req.sessionID).then(result => {
        res.send(result);
    });
});

export default routerUser;

