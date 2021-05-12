import express from 'express'
import postServiceMjs from '../services/postService.mjs';

const postService = postServiceMjs;
const routerPosts = express.Router()


routerPosts.get("/api/posts", async (req, res) => {
    await postService.getPosts().then(result => {
        res.send(result);
    });
});

routerPosts.post("/api/createPost", async (req, res) => {
    await postService.createPost(req.body).then(result => {
        res.send(result);
    });
});

routerPosts.patch("/api/updatePost", async (req, res) => {
    await postService.updatePost(req.body).then(result => {
        res.send(result);
    });
});

routerPosts.delete("/api/deletePost", async (req, res) => {
    await postService.createPost(req.params.id).then(result => {
        res.send(result);
    });
});

export default routerPosts;