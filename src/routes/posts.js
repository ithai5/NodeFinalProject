import express from 'express'
import {
    createPost,
    getAllPostsBySearch,
    getAllPostsByType,
    getAllPostsByUser,
    getPostById,
    getAllPosts,
} from '../services/postService.js'

const routerPosts = express.Router()

routerPosts.get('/api/posts', async (req, res) => {
    if (Object.keys(req.query).length === 0)
        await getAllPosts().then((posts) => {
            res.send({ posts })
        })
    if (req.query.type)
        await getAllPostsByType(req.query.type).then((posts) =>
            res.send({ posts })
        )
    if (req.query.user)
        await getAllPostsByUser(req.session.userId).then((result) =>
            res.send({ posts: result })
        )
    if (req.query.post)
        await getAllPostsBySearch(req.query.post).then((result) =>
            res.send({ posts: result })
        )
})

routerPosts.all('/api/post/*', (req, res, next) => {
    if (!req.session.userId) {
        res.sendStatus(401)
    } else {
        next()
    }
})

routerPosts.get('/api/posts/:id', (req, res) => {
    getPostById(req.params.id)
        .then((post) => res.send({ post }))
        //checks for error handling
        .catch(() => {
            res.status(404)
        })
})

routerPosts.post('/api/post', (req, res) => {
    // should make a check that we are receiving only post things
    const post = {
        ...req.body,
        user: req.session.userId,
    }
    createPost(post).then((response) => {
        console.log(response)
        //TODO: handle response
        //res.send(post) //maybe should return a json object and the redirect will heppend from the public folder
        res.redirect('/')
    })
})

routerPosts.patch('/api/post/:id', (req, res) => {
    postService.updatePost(req.query.id, req.body).then(() => {
        //TODO: handle response

        res.redirect('/') //maybe should return a json object and the redirect will heppend from the public folder
    })
})

routerPosts.delete('/api/post/:id', (req, res) => {
    if (!req.session.userId) {
        res.send({ message: 'unauthorised call' })
    }
    //TODO: if admin = delete else = archive
    postService.deletePost(req.params.id).then(() => {
        //TODO: handle response
        res.redirect('/') //maybe should return a json object and the redirect will heppend from the public folder
    })

    //Either req.query or req.params
})

export default routerPosts
