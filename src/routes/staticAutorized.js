import { Router } from "express";

const routerStaticAuth = Router();


routerStaticAuth.use(function(req, res, next) {
	if (req.session.userId) {
		next()
	} else {
		res.redirect('/login')
	}
})

routerStaticAuth.get('/logout', (req, res) => {
	if(req.session.userId)
		delete req.session.userId
	res.redirect('/')
})

routerStaticAuth.get('/posts/:id', (req, res) => {
	res.send(CSS + title('H2H - Post') + navbar + viewPost + FOOTER)
})

routerStaticAuth.get('/createPost', (req, res) => {
	res.send(CSS + title('H2H - New Post') + navbar + createPost + FOOTER)
})

routerStaticAuth.get('/chats', (req, res) => {
	res.send(CSS + title('H2H - Messages') + navbar + chatList + FOOTER)
})

routerStaticAuth.get('/chats/:id', (req, res) => {
	res.send(CSS + title('H2H - Messages') + navbar + chat + FOOTER)
})