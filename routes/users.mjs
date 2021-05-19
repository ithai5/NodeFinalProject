import express from 'express';
import userService from "../services/userService.mjs"
const routerUser = express.Router()


// routerUser.get("/login", (req, res) => {
//     res.send({messages: "test"});
// })

routerUser.post("/api/login", async (req, res) => {
    const loginInfo = {... req.body};
    if (await userService.getUser(loginInfo)){
        res.send( { message: "login success" } )
    }
    else{
        
        res.send( { message: "login failed" } )
    }
    
    //condition needs to be connected to the database
        //Send back a cookie and expiration,
        //Something identifying the logged in user (id?)
})


export default routerUser;