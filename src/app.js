import { dirname } from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import fs from 'fs'
import http from 'http'
import { createSession } from './services/sessionService.js'
import { Server } from 'socket.io'
import routerPosts from './routes/posts.js'
import routerUsers from './routes/users.js'
import routerChats from './routes/chats.js'
import * as dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(createSession())

app.use(routerUsers)
app.use(routerPosts)
app.use(routerChats)

app.use(middlewareLoggedUser)
app.use(sawCookieModal)

function title(titleName) {
    return `<title> ${titleName} </title>`
}

const __dirname = dirname(fileURLToPath(import.meta.url)) + '/..'

const cssTamplate = fs.readFileSync(
    __dirname + '/public/templates/cssTamplates/cssTamplate.html',
    'utf-8'
)
let nav
const footer = fs.readFileSync(
    __dirname + '/public/templates/footer/footer.html',
    'utf-8'
)

const feed = fs.readFileSync(
    __dirname + '/public/components/feed/feed.html',
    'utf-8'
)
const login = fs.readFileSync(
    __dirname + '/public/components/login/login.html',
    'utf-8'
)
const confirmLogin = fs.readFileSync(
    __dirname + '/public/components/login/confirmLogin.html',
    'utf-8'
)
const signup = fs.readFileSync(
    __dirname + '/public/components/signup/signup.html',
    'utf-8'
)
const createPost = fs.readFileSync(
    __dirname + '/public/components/post/createPost.html',
    'utf-8'
)
const chat = fs.readFileSync(
    __dirname + '/public/components/chat/chat.html',
    'utf-8'
)
const viewPost = fs.readFileSync(
    __dirname + '/public/components/post/viewPost.html',
    'utf-8'
)
const chatList = fs.readFileSync(
    __dirname + '/public/components/chatList/chatList.html',
    'utf-8'
)
const pageNotFound = fs.readFileSync(
    __dirname + '/public/components/pageNotFound/pageNotFound.html',
    'utf-8'
)
const cookieModal = fs.readFileSync(
    __dirname + '/public/templates/cookieModal/cookieModal.html',
    'utf-8'
)

function middlewareLoggedUser(req, res, next) {
    //
    if (req.session.userId) {
        nav = fs.readFileSync(
            __dirname +
                '/public/templates/navbar/profileNavbar/profileNavbar.html',
            'utf-8'
        )
    } else {
        nav = fs.readFileSync(
            __dirname + '/public/templates/navbar/navbar.html',
            'utf-8'
        )
    }
    next()
}

function unauthorizedUser(req, res, next) {
    if (req.session.userId) {
        next()
    } else {
        res.redirect('/login')
    }
}

function sawCookieModal(req, res, next) {
    if (!req.session.sawCookie) {
        nav =
            fs.readFileSync(
                __dirname + '/public/templates/navbar/navbar.html',
                'utf-8'
            ) + cookieModal
        req.session.sawCookie = true
    }
    next()
}

app.get('/', (req, res) => {
    res.send(cssTamplate + title('H2H') + nav + feed + footer)
})

app.get('/requested', (req, res) => {
    res.send(cssTamplate + title('H2H') + nav + feed + footer)
})

app.get('/provided', (req, res) => {
    res.send(cssTamplate + title('H2H') + nav + feed + footer)
})

app.get('/myoffers', unauthorizedUser, (req, res) => {
    res.send(cssTamplate + title('H2H- My Offers') + nav + feed + footer)
})

app.get('/search', (req, res) => {
    res.send(cssTamplate + title('H2H') + nav + feed + footer)
})

app.get('/login', (req, res) => {
    if (req.session.userId) {
        res.redirect('/')
    }
    res.send(cssTamplate + title('H2H - Login') + nav + login + footer)
})

app.get('/confirm/:code', (req, res) => {
    res.send(
        cssTamplate + title('H2H - Confirmation') + nav + confirmLogin + footer
    )
})

app.get('/signup', (req, res) => {
    if (req.session.userId) {
        res.redirect('/')
    }
    res.send(cssTamplate + title('H2H - Signup') + nav + signup + footer)
})

app.get('/signup/complete', (req, res) => {
    res.send(
        cssTamplate +
            title('H2H - Signup') +
            nav +
            '<script>alert("Please check your email for complete the signup process");  window.location.href = "/"</script>' +
            footer
    )
})

app.get('/signup/failed', (req, res) => {
    res.send(
        cssTamplate +
            title('H2H - Signup') +
            nav +
            '<script>alert("we could not complete your signup process please try again");  window.location.href = "/signup"</script>' +
            footer
    )
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

app.get('/posts/:id', unauthorizedUser, (req, res) => {
    res.send(cssTamplate + title('H2H - Post') + nav + viewPost + footer)
})

app.get('/createPost', unauthorizedUser, (req, res) => {
    res.send(cssTamplate + title('H2H - New Post') + nav + createPost + footer)
})

app.get('/chats', unauthorizedUser, (req, res) => {
    res.send(cssTamplate + title('H2H - Messages') + nav + chatList + footer)
})

app.get('/chats/:id', unauthorizedUser, (req, res) => {
    res.send(cssTamplate + title('H2H - Messages') + nav + chat + footer)
})

//get for all the other pages
app.get('/*', (req, res) => {
    res.send(
        cssTamplate +
            title('H2H - Page not found') +
            nav +
            pageNotFound +
            footer
    )
})

const server = http.createServer(app)
const io = new Server(server)

io.on('connection', (_socket) => {
    //Maybe don't send the entire room, since it sends the entire chatlog as well
    /*
    socket.on('sendMessage', (room, message, receiverId) => {
        //Send a message to the correct chatroom
        socket.to(room.id).emit('messageReceived', message)
        //Inform user that their message has been sent
        socket.emit('messageSent', message)
        //Send the roomId to notify the recipient user, let the other user realtime information about new notifications
        socket.to(receiverId).emit('newNotification', room.id)
    })


    socket.on('joinRoom', (room) => {
        socket.join(room.id)
    })

    //Event should be called something else
    socket.on('triggerNotifications', (user) => {
        socket.join(user.id)
    })*/
})

const PORT = process.env.PORT || 8080

server.listen(PORT, (err) => {
    err ? console.log(err) : console.log('App runs on port: ', Number(PORT))
})
