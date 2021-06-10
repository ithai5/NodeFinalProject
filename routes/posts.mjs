import express from 'express'
import postServiceMjs from '../services/postService.mjs';

const postService = postServiceMjs;
const routerPosts = express.Router()


routerPosts.get("/api/posts", (req, res) => {
    let query;
    if (req.query.post) {
        query = {$text: {$search: req.query.post}};
    }
    else if (req.query.type) {
        query = {type: req.query.type};
    }
    else if (req.query.user) {
        query = {user: req.session.userId}
    }
    postService.getPosts(query).then(result => {
        res.send({posts: result});
    });
});

routerPosts.all("/api/post/*", (req, res ,next) => {
    if(!req.session.userId) { 
        res.sendStatus(401)
    }
    else{
        next();
    }
});
routerPosts.get("/api/posts/:id", (req, res) => {
    postService.getPosts(req.params.id)
        .then(result => {    
            res.send({post: result.length === 1? result[0] : null})}); 
});

routerPosts.post("/api/post", (req, res) => {
    // should make a check that we are recieving only post things
    const post = {
     ...req.body,
        user: req.session.userId,
    };
    postService.createPost(post).then(() => {
        res.redirect("/"); //maybe should return a json object and the redirect will heppend from the public folder
    });
});

routerPosts.patch("/api/post", (req, res) => {
    postService.updatePost(req.query.id, req.body).then(() => {
        res.redirect("/"); //maybe should return a json object and the redirect will heppend from the public folder
    });
});

routerPosts.delete("/api/post", (req, res) => {
    if(!req.session.userId) { 
        res.send({message: "unauthorised call"})
    }
    else{ 
        postService.deletePost(req.query.id).then(() => {
            res.redirect("/"); //maybe should return a json object and the redirect will heppend from the public folder
        });
    };


    //Either req.query or req.params
});

export default routerPosts;