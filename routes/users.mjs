import express from 'express';
import userService from "../services/userService.mjs";

const routerUsers = express.Router()

routerUsers.post("/api/login", async (req, res) => {
    //const loginInfo = {... req.body};
    userService.userValidation({... req.body})
        .then(serviceResponse => {
            if (serviceResponse) {
                //can store any other data from the db to the seasion
                req.session.userId = serviceResponse[0]._id;
                res.redirect("/");
            }
            else{
                res.send({ message: "login failed" });
            }
            
        })
});

routerUsers.post("/api/signup", async (req, res) => {
    const signUpInfo = {... req.body};
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let checks = [
        signUpInfo.firstName.length>1, signUpInfo.lastName.length>1, 
        emailRegex.test(signUpInfo.email), signUpInfo.password.length > 7
    ]
    if (!checks.includes(false)) {
        userService.signUp(signUpInfo).then(result => {
            if (result){
                res.send({message: "sign-up successfuly"});
            }    else{
                res.send({message: "failed to sign-up"});
            }        
        });    
    }
});

routerUsers.get("/api/users", (req, res) => {
    userService.getUsers().then(result => res.send(result));
})

routerUsers.get("/api/users/:id", (req, res) => {
    
    if (req.params.id === "profile") {
        userService.getUsers(req.session.userId).then(result => res.send(result));
    } else {
        userService.getUsers(req.params.id).then(result => res.send(result));
    }
})


routerUsers.post("/api/users/notifications", (req, res) => {
    console.log("body tings: ", req.body);
    userService.saveNotification(req.body.roomId, req.body.type, req.body.receiverId).then(result => res.send(result));
})

//Redundant
routerUsers.get("/api/currentUser", (req, res) => {
    res.send({userId: req.session.userId});
});

export default routerUsers;

