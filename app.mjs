import {} from "dotenv/config";
import { dirname } from "path"
import { fileURLToPath } from "url";
import express from "express"
import fs from "fs"
import routerPosts from "./routes/posts.mjs";
import routerUser from "./routes/users.mjs";
import http from "http";
import { Server } from "socket.io";
import { createSession } from "./services/sessionService.mjs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(createSession());
app.use(routerUser);
app.use(routerPosts);

function title(titleName) {
    return `<title> ${titleName} </title>`
}

const __dirname = dirname(fileURLToPath(import.meta.url))
const cssTamplate = fs.readFileSync(__dirname + "/public/templates/cssTamplates/cssTamplate.html", "utf-8")
let nav = fs.readFileSync(__dirname + "/public/templates/navbar/navbar.html", "utf-8");
const footer = fs.readFileSync(__dirname + "/public/templates/footer/footer.html", "utf-8");
const feed = fs.readFileSync(__dirname + "/public/components/feed/feed.html", "utf-8");
const login = fs.readFileSync(__dirname + "/public/components/login/login.html", "utf-8");
const signup = fs.readFileSync(__dirname + "/public/components/signup/signup.html", "utf-8");
const createPost = fs.readFileSync(__dirname + "/public/components/post/createPost.html", "utf-8");
const chat = fs.readFileSync(__dirname + "/public/components/chat/chat.html", "utf-8");

app.get("/*", (req, res, next) => {
    if (req.session.userId) {
        console.log(req.session.userId)
        nav = fs.readFileSync(__dirname + "/public/templates/navbar/profileNavbar/profileNavbar.html", "utf-8")
    }
    else{
        nav = fs.readFileSync(__dirname + "/public/templates/navbar/navbar.html", "utf-8");
    }
    next()
})

app.get("/", (req, res) => {
    res.send(cssTamplate + title("H2H") +  nav + feed + footer);
});


app.get("/login", (req, res)  => {
    res.send(cssTamplate + title("H2H - Login") + nav + login + footer);
});

app.get("/signup", (req, res) => {
    res.send(cssTamplate + title("H2H - Signup") + nav + signup + footer);
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
})

app.get("/createPost", (req, res) => {
    if(req.session.userId){
        res.send(cssTamplate + title("H2H - New Post") + nav + createPost + footer);
    }
    else{
        res.redirect("/login")
    }
});

app.get("/chat", (req, res) => {
    res.send(cssTamplate + nav + chat+ footer);
})

//get for all the other pages
app.get("/*", (req,res) => {
    res.send(cssTamplate + title("Page not found")+ nav + "<h1> That page does not exist 404</h1>" + footer)
})







const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    socket.on('private message', (anotherSocketId, msg) => {
        socket.to(anotherSocketId).emit('private message', socket.id, msg);
    });
});






const PORT = process.env.PORT || 8080

server.listen(PORT, err => {
    err? console.log(err) : console.log('App runs on port: ', Number(PORT))
});

