import { Router } from "express";
import {
	cssTamplate,
	footer,
	profileNav,
	nav,
	feed,
	login,
	confirmLogin,
	signup,
	createPost,
	chat,
	viewPost,
	chatList,
	pageNotFound,
	cookieModal,
} from "../static-pages/staticPages.js";

function title(titleName) {
	if(titleName === null || titleName === undefined){
		titleName = "H2H";
	}
	return `<title> ${titleName} </title>`
}

// Instantiate constants CSS and FOOTER already loaded in staticPages.js
const CSS = cssTamplate;
const FOOTER = footer;

const routerStatic = Router();

let navbar;

routerStatic.use(function(req, res, next) {
	navbar = req.session.userId ? profileNav : nav;
	if(!req.session.sawCookie){
		navbar = navbar + cookieModal;
		req.session.sawCookie = true;
	}
	return next()
});

routerStatic.get('/', (req, res) => {
	res.send(CSS + title('H2H') + navbar + feed + FOOTER)
})

routerStatic.get('/requested', (req, res) => {
	res.send(CSS + title('H2H') + navbar + feed + FOOTER)
})

routerStatic.get('/provided', (req, res) => {
	res.send(CSS + title('H2H') + navbar + feed + FOOTER)
})

routerStatic.get('/myoffers', unauthorizedUser, (req, res) => {
	res.send(CSS + title('H2H- My Offers') + navbar + feed + FOOTER)
})

routerStatic.get('/search', (req, res) => {
	res.send(CSS + title('H2H') + navbar + feed + FOOTER)
})

routerStatic.get('/login', (req, res) => {
	if (req.session.userId) {
			res.redirect('/')
	}
	res.send(CSS + title('H2H - Login') + navbar + login + FOOTER)
})

routerStatic.get('/confirm/:code', (req, res) => {
	res.send(
			CSS + title('H2H - Confirmation') + navbar + confirmLogin + FOOTER
	)
})

routerStatic.get('/signup', (req, res) => {
	if (req.session.userId) {
			res.redirect('/')
	}
	res.send(CSS + title('H2H - Signup') + navbar + signup + FOOTER)
})

routerStatic.get('/signup/complete', (req, res) => {
	res.send(
			CSS +
					title('H2H - Signup') +
					navbar +
					'<script>alert("Please check your email for complete the signup process");  window.location.href = "/"</script>' +
					FOOTER
	)
})

routerStatic.get('/signup/failed', (req, res) => {
	res.send(
			CSS +
					title('H2H - Signup') +
					navbar +
					'<script>alert("we could not complete your signup process please try again");  window.location.href = "/signup"</script>' +
					FOOTER
	)
})

routerStatic.get('/logout', (req, res) => {
	req.session.destroy()
	res.redirect('/')
})

function unauthorizedUser(req, res, next) {
	if (req.session.userId) {
			next()
	} else {
			res.redirect('/login')
	}
}

routerStatic.get('/posts/:id', unauthorizedUser, (req, res) => {
	res.send(CSS + title('H2H - Post') + navbar + viewPost + FOOTER)
})

routerStatic.get('/createPost', unauthorizedUser, (req, res) => {
	res.send(CSS + title('H2H - New Post') + navbar + createPost + FOOTER)
})

routerStatic.get('/chats', unauthorizedUser, (req, res) => {
	res.send(CSS + title('H2H - Messages') + navbar + chatList + FOOTER)
})

routerStatic.get('/chats/:id', unauthorizedUser, (req, res) => {
	res.send(CSS + title('H2H - Messages') + navbar + chat + FOOTER)
})

//get for all the other pages
routerStatic.get('/*', (req, res) => {
	res.send(
			CSS +
					title('H2H - Page not found') +
					navbar +
					pageNotFound +
					FOOTER
	)
})

export default routerStatic;
