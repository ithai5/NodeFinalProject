import express from 'express'
import postServiceMjs from '../services/postService.mjs';

const postService = postServiceMjs;
const routerPosts = express.Router()


routerPosts.get("/api/posts", (req, res) => {
    postService.getPosts().then(result => {
        res.send(result);
    });
});

routerPosts.get("/api/posts/:id", (req, res) => {
    postService.getPosts(req.params.id).then(respose => res.send({"message" : respose}));
    
})

routerPosts.post("/api/post", (req, res) => {
    console.log(req.body);
    postService.createPost(req.body).then(result => {
        res.send(result);
    });
});

routerPosts.patch("/api/post", (req, res) => {
    postService.updatePost(req.query.id, req.body).then(result => {
        res.send(result);
    });
});

routerPosts.delete("/api/post", (req, res) => {
    //Either req.query or req.params
    postService.deletePost(req.query.id).then(result => {
        res.send(result);
    });
});

export default routerPosts;