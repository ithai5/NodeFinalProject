import express from 'express'
import postServiceMjs from '../services/postService.mjs';

const postService = postServiceMjs;
const routerPosts = express.Router()

/*
routerPosts.get("/api/posts", (req, res) => {
    console.log("From router: ", postService.getPosts());
    res.send(postService.getPosts());
});
*/



export default routerPosts;