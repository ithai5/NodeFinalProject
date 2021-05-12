const router = require('express').Router()


router.get("/login", (req, res) => {

})

router.post("/api/login", (req, res) => {
    const loginInfo = {... req.body};
    
    //condition needs to be connected to the database
    const condition = true;

    if (condition) {
        //Send back a cookie and expiration,
        //Something identifying the logged in user (id?)
        res.send()
    }
})


module.exports = {
    router: router
}