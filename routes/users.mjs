import express from 'express';
import userService from "../services/userService.mjs";
import { verifySession } from "../services/sessionService.mjs";

const routerUser = express.Router()

routerUser.post("/api/login", async (req, res) => {
    //const loginInfo = {... req.body};
    userService.userValidation({... req.body})
        .then(serviceResponse => {
            if(serviceResponse){
                //can store any other data from the db to the seasion
                req.session.userId = serviceResponse[0]._id
                res.redirect("/")
            }
            else{
                res.send({ message: "login failed" });
            }
            
        })
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
            if (result){
                res.send({message: "sign-up successfuly"});
            }    else{
                res.send({message: "failed to sign-up"});
            }        
        });    
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

