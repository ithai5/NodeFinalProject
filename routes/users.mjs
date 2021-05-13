import express from 'express';
import userService from "../services/userService.mjs"
const routerUser = express.Router()


routerUser.get("/login", (req, res) => {
    res.send({messages: "test"});
})

routerUser.post("/api/login", (req, res) => {
    const loginInfo = {... req.body};
    console.log(loginInfo);

    //condition needs to be connected to the database
        //Send back a cookie and expiration,
        //Something identifying the logged in user (id?)
    res.send({message : "woopidie"});
})


export default routerUser;