import express from 'express';
import userService from "../services/userService.mjs";
import { verifySession } from "../services/sessionService.mjs";

const routerUser = express.Router()

routerUser.post("/api/login", async (req, res) => {
    //const loginInfo = {... req.body};
    userService.userValidation({... req.body})
        .then(serviceResponse => {
            console.log(serviceResponse[0]);
            if(serviceResponse){
                //can store any other data from the db to the seasion
                req.session.userId = serviceResponse[0]._id
                res.send({ message: "login success" })
            }
            else{
                res.send({ message: "login failed" });
            }
            
        })
    // const userLogged = userService.getUser(loginInfo)
    
    // if (await userLogged ) {
    //     userLogged.then(res=> console.log(res))
    //     //add the email of the user for the seasen
    //     //the cookie is provided only if login succeed
    //     // req.session.username = await userLogged[0]._id;
    //     //should we update the user in our db with the session _id so we can find it afterwards for future use?
    //     res.send({ message: "login success" });
    // }
    // else {
    //     res.send({ message: "login failed" });
    // }
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

