import {} from "dotenv/config";
import { dirname } from "path"
import { fileURLToPath } from "url";
import express from "express"
import fs from "fs"
import routerPosts from "./routes/posts.mjs";
import routerUser from "./routes/users.mjs";


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));
app.use(routerUser);
app.use(routerPosts);

const __dirname = dirname(fileURLToPath(import.meta.url))

const nav = fs.readFileSync(__dirname + "/public/templates/navbar/navbar.html", "utf-8");
const footer = fs.readFileSync(__dirname + "/public/templates/footer/footer.html", "utf-8");
const feed = fs.readFileSync(__dirname + "/public/components/feed/feed.html", "utf-8");
const login = fs.readFileSync(__dirname + "/public/components/login/login.html", "utf-8");
const signup = fs.readFileSync(__dirname + "/public/components/signup/signup.html", "utf-8");
const createPost = fs.readFileSync(__dirname + "/public/components/post/createPost.html", "utf-8");

app.get("/", (req, res) => {
    res.send(nav + feed + footer);
});


app.get("/login", (req, res)  => {
    res.send(nav + login + footer);
});

app.get("/signup", (req, res) => {
    res.send(nav + signup + footer);
});

app.get("/createPost", (req, res) => {
    res.send(nav + createPost + footer);
});




const PORT = process.env.PORT || 8080

app.listen(PORT, err => {
    err? console.log(err) : console.log('App runs on port: ', Number(PORT))
});

