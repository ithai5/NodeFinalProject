const router = require('express').Router();
const postService = require("../services/postService");


//postService  doesnt work. Probably something wrong with imports
router.get("/api/posts", (req, res) => {
    // res.send(postService.getPosts());
});




module.exports = {
    router: router
}
